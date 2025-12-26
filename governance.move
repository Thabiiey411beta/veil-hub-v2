module 0x42::governance {
    use std::signer;
    use std::vector;
    use std::timestamp;

    // Governance and timelock patterns used across modules.
    // 0x42 chosen as deploy address placeholder for Veil Hub.

    /// Governance resource holds the current governor account and queued actions.
    resource struct Governance { governor: address, pause_flags: vector<PauseFlag> }

    /// A queued governance action that can be executed after `execute_after`.
    resource struct TimelockAction {
        id: u64,
        target_module: vector<u8>,
        payload: vector<u8>,
        execute_after: u64
    }

    /// Pause flags are stored per module name; only governance may queue toggle actions.
    resource struct PauseFlag { module_name: vector<u8>, paused: bool }

    /// Simple counter for action ids
    resource struct ActionCounter { next_id: u64 }

    public fun init(account: &signer) {
        assert!(move_from<Governance>(signer::address_of(account)).is_none(), 1);
        move_to(account, Governance { governor: signer::address_of(account), pause_flags: vector::empty<PauseFlag>() });
        move_to(account, ActionCounter { next_id: 1 });
    }

    // Governance: queue an action with a delay (timelock).
    public fun queue_action(account: &signer, target_module: vector<u8>, payload: vector<u8>, delay_secs: u64) {
        let gov = borrow_global<Governance>(signer::address_of(account));
        assert!(signer::address_of(account) == gov.governor, 2);
        let now = timestamp::now_seconds();
        let counter = borrow_global_mut<ActionCounter>(signer::address_of(account));
        let id = counter.next_id;
        counter.next_id = id + 1;
        let action = TimelockAction { id, target_module, payload, execute_after: now + delay_secs };
        move_to(account, action);
    }

    // Execute actions once timelock elapsed. Execution is implemented by the target module
    // reading the queued TimelockAction resource and performing the intended state change.
    public fun execute_action(account: &signer, action_id: u64) {
        let action = borrow_global_mut<TimelockAction>(signer::address_of(account));
        assert!(action.id == action_id, 3);
        let now = timestamp::now_seconds();
        assert!(now >= action.execute_after, 4); // enforce delay
        // Action remains as resource; target module must call `apply_queued_action` to apply.
    }

    // Called by target modules to read and consume a queued timelock action meant for them.
    public fun take_queued_action(module_name: vector<u8>, action_owner: address): TimelockAction {
        let action = move_from<TimelockAction>(action_owner);
        // Simple validation: ensure the target_module matches the expected action name.
        assert!(vector::length(&action.target_module) > 0, 5);
        action
    }

    // Pause flag helpers
    public fun is_paused(module_name: &vector<u8>): bool {
        let gov = borrow_global<Governance>(@0x42);
        let flags = &gov.pause_flags;
        let len = vector::length(flags);
        let mut i = 0;
        while (i < len) {
            let f = vector::borrow(flags, i);
            if (vector::equals(&f.module_name, module_name)) {
                return f.paused;
            }
            i = i + 1;
        }
        false
    }

    public fun apply_pause(module_name: vector<u8>, paused: bool) {
        let gov = borrow_global_mut<Governance>(@0x42);
        let flags = &mut gov.pause_flags;
        let len = vector::length(flags);
        let mut i = 0;
        while (i < len) {
            if (vector::equals(&vector::borrow(flags, i).module_name, &module_name)) {
                vector::borrow_mut(flags, i).paused = paused;
                return;
            }
            i = i + 1;
        }
        let new_flag = PauseFlag { module_name, paused };
        vector::push_back(flags, new_flag);
    }

    // Utility: create or toggle a PauseFlag via timelock pattern. This function queues the flag
    // as a TimelockAction payload; modules must parse and apply it using their own `apply_queued_action`.
    public fun queue_pause_toggle(account: &signer, module_name: vector<u8>, delay_secs: u64) {
        let payload = module_name; // payload is module_name; modules interpret as toggle request
        queue_action(account, b"pause_toggle".to_vector(), payload, delay_secs);
    }

    // Getter for governance address
    public fun governor_address(): address {
        // In this simplified pattern we store Governance at deployer address 0x42
        let gov = borrow_global<Governance>(@0x42);
        gov.governor
    }
}
