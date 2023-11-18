import { z } from 'zod'

export const acs_credential_provisioning_automation = z.object({
  acs_credential_provisioning_automation_id: z.string().uuid(),
  credential_manager_acs_system_id: z.string().uuid(),
  user_identity_id: z.string().uuid(),
  created_at: z.string().datetime(),
  workspace_id: z.string().uuid(),
})

export type AcsCredentialProvisioningAutomation = z.output<
  typeof acs_credential_provisioning_automation
>
