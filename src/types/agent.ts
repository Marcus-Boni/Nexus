export type AgentId =
  | 'claude-code'
  | 'gemini-cli'
  | 'codex-cli'
  | 'antigravity'
  | 'copilot'

export interface AgentAdapter {
  id: AgentId
  label: string
  command: string
  args: string[]
  contextFile: string
  injectViaStdin: boolean
  color: string
  icon: string
}
