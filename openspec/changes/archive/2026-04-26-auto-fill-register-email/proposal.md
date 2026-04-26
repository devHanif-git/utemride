## Why

Users currently have to type their Student/Staff ID and then type their full email address separately, which is redundant since the UTeM email format strictly follows `{id}@student.utem.edu.my` or `{id}@utem.edu.my`. This change eliminates redundancy and prevents email formatting errors during registration by automatically generating the email address based on the provided ID and a selectable domain.

## What Changes

- Modify the Register view in `app/login.tsx` to automatically populate the email field based on the input from the ID field.
- Add a domain selector (dropdown, toggle, or segmented control) for the email address, allowing the user to choose between `@student.utem.edu.my` (default) and `@utem.edu.my`.
- Disable the editable text input portion of the Email field during registration so it accurately reflects the ID without allowing manual mismatches.
- Ensure these changes only apply during Registration mode, leaving the standard Email input intact for Login mode.

## Capabilities

### New Capabilities
- `email-domain-selector`: Capability to select email domain and auto-construct the email address from a provided ID during registration.

### Modified Capabilities
- `auth-flow`: Modified registration requirements to construct email addresses dynamically rather than relying on manual input.

## Impact

- `app/login.tsx`: UI modifications and form state handling updates.
- User experience for registration will be smoother and less prone to typing errors.
