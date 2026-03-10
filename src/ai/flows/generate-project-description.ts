'use server';
/**
 * @fileOverview A GenAI tool to assist the founder in crafting polished and engaging project descriptions and summaries.
 *
 * - generateProjectDescription - A function that generates a project description and summary.
 * - ProjectDescriptionInput - The input type for the generateProjectDescription function.
 * - ProjectDescriptionOutput - The return type for the generateProjectDescription function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ProjectDescriptionInputSchema = z.object({
  technicalNotes: z
    .string()
    .optional()
    .describe('Detailed technical notes or explanations about the project.'),
  bulletPoints: z
    .array(z.string())
    .optional()
    .describe('A list of key features or highlights of the project.'),
});
export type ProjectDescriptionInput = z.infer<typeof ProjectDescriptionInputSchema>;

const ProjectDescriptionOutputSchema = z.object({
  description: z.string().describe('A polished and engaging project description.'),
  summary: z.string().describe('A concise, one-paragraph summary of the project.'),
});
export type ProjectDescriptionOutput = z.infer<typeof ProjectDescriptionOutputSchema>;

export async function generateProjectDescription(
  input: ProjectDescriptionInput
): Promise<ProjectDescriptionOutput> {
  return generateProjectDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectDescriptionPrompt',
  input: { schema: ProjectDescriptionInputSchema },
  output: { schema: ProjectDescriptionOutputSchema },
  prompt: `You are an expert marketing copywriter specializing in creating compelling content for technical project portfolios.
Your goal is to transform raw technical notes and bullet points into a polished project description and a concise summary.

Craft a detailed and engaging project description that highlights the project's purpose, key features, technologies used, and its impact or benefits. The description should be professional and attractive to potential clients or collaborators.
Then, create a brief, impactful summary (one paragraph) that captures the essence of the project.

Technical Notes:
{{#if technicalNotes}}{{{technicalNotes}}}{{else}}No detailed technical notes provided.{{/if}}

Bullet Points:
{{#if bulletPoints}}
{{#each bulletPoints}} - {{{this}}}
{{/each}}
{{else}}No specific bullet points provided.{{/if}}

Based on the above, generate the project description and summary. Ensure the output strictly adheres to the provided JSON schema.`,
});

const generateProjectDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProjectDescriptionFlow',
    inputSchema: ProjectDescriptionInputSchema,
    outputSchema: ProjectDescriptionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
