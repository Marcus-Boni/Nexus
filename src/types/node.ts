export type NodeType = 'decision' | 'artifact' | 'insight' | 'file-change' | 'error'

export type RelationType = 'related' | 'depends-on' | 'conflicts-with' | 'extends' | 'supersedes'

export interface GraphNode {
  id: string
  projectId: string
  sessionId?: string
  agentId: string
  type: NodeType
  title: string
  content: string
  tags: string[]
  importance: number
  createdAt: Date
}

export interface GraphEdge {
  id: string
  sourceNodeId: string
  targetNodeId: string
  relation: RelationType
  createdAt: Date
}
