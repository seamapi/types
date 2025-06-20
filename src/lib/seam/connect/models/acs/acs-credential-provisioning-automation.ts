import { z } from 'zod'

export const acs_credential_provisioning_automation = z.object({
  acs_credential_provisioning_automation_id: z.string().uuid(),
  credential_manager_acs_system_id: z.string().uuid(),
  user_identity_id: z.string().uuid(),
  created_at: z.string().datetime(),
  workspace_id: z.string().uuid(),
}).describe(`
  ---
  route_path: /acs/credential_provisioning_automations
  deprecated: Not used.
  undocumented: Deprecated. Will be removed.
  ---
`)

export const enrollment_automation = z.object({
  enrollment_automation_id: z
    .string()
    .uuid()
    .describe('ID of the enrollment automation.'),
  credential_manager_acs_system_id: z
    .string()
    .uuid()
    .describe(
      'ID of the associated [ACS system](https://docs.seam.co/latest/capability-guides/access-systems) that serves as the credential manager.',
    ),
  user_identity_id: z
    .string()
    .uuid()
    .describe(
      'ID of the associated [user identity](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/managing-mobile-app-user-accounts-with-user-identities#what-is-a-user-identity).',
    ),
  created_at: z
    .string()
    .datetime()
    .describe('Date and time at which the enrollment automation was created.'),
  workspace_id: z
    .string()
    .uuid()
    .describe(
      'ID of the [workspace](https://docs.seam.co/latest/core-concepts/workspaces) that contains the enrollment automation.',
    ),
}).describe(`
  ---
  route_path: /user_identities/enrollment_automations
  deprecated: Will be removed. Instead, link the \`user_identity\` to the \`acs_user\` in the access system in which you want to issue credentials.
  ---
  Represents an [enrollment automation](https://docs.seam.co/latest/capability-guides/mobile-access-in-development/issuing-mobile-credentials-from-an-access-control-system) within the [Seam mobile access solution](https://docs.seam.co/latest/capability-guides/mobile-access-in-development).
`)

export type EnrollmentAutomation = z.output<typeof enrollment_automation>

export type AcsCredentialProvisioningAutomation = z.output<
  typeof acs_credential_provisioning_automation
>
