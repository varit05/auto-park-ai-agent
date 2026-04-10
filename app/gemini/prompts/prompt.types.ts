/**
 * Type definitions for system prompts
 * All prompts should implement this interface for consistency
 */
export interface PromptTemplate {
  /** Unique identifier for the prompt */
  id: string;
  /** Human readable name */
  name: string;
  /** The actual prompt content */
  content: string;
  /** Prompt version for tracking changes */
  version: string;
  /** Description of what this prompt is used for */
  description: string;
}