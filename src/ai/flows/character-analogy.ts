'use server';

/**
 * @fileOverview Character Analogy Generator Flow.
 *
 *  This file contains the Genkit flow for suggesting One Piece character analogies based on a user avatar description.
 *
 * - `characterAnalogy`: The main function to trigger the character analogy generation.
 * - `CharacterAnalogyInput`: The input type for the `characterAnalogy` function, defining the user avatar description.
 * - `CharacterAnalogyOutput`: The output type for the `characterAnalogy` function, providing the suggested character analogy.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const CharacterAnalogyInputSchema = z.object({
  avatarDescription: z
    .string()
    .describe('A detailed description of the user avatar.'),
});
export type CharacterAnalogyInput = z.infer<typeof CharacterAnalogyInputSchema>;

const CharacterAnalogyOutputSchema = z.object({
  suggestedCharacter: z
    .string()
    .describe('A One Piece character analogy for the avatar.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the character analogy suggestion.'),
});
export type CharacterAnalogyOutput = z.infer<typeof CharacterAnalogyOutputSchema>;

export async function characterAnalogy(
  input: CharacterAnalogyInput
): Promise<CharacterAnalogyOutput> {
  try {
    return await characterAnalogyFlow(input);
  } catch (error) {
    console.error('Error in characterAnalogy flow:', error);
    throw new Error('Failed to generate character analogy.');
  }
}

const characterAnalogyPrompt = ai.definePrompt({
  name: 'characterAnalogyPrompt',
  input: {
    schema: z.object({
      avatarDescription: z
        .string()
        .describe('A detailed description of the user avatar.'),
    }),
  },
  output: {
    schema: z.object({
      suggestedCharacter: z
        .string()
        .describe('A One Piece character analogy for the avatar.'),
      reasoning: z
        .string()
        .describe('The reasoning behind the character analogy suggestion.'),
    }),
  },
  prompt: `You are an AI assistant specialized in providing One Piece character analogies. Given a description of a user's avatar, suggest a character from One Piece that closely resembles the avatar and provide a detailed explanation for your choice.
      
      Avatar Description: {{{avatarDescription}}}
      
      Suggested Character: (Character Name)
      Reasoning: (Explain why this character is a good analogy. Be specific and provide details.)`,
});

const characterAnalogyFlow = ai.defineFlow<
  typeof CharacterAnalogyInputSchema,
  typeof CharacterAnalogyOutputSchema
>(
  {
    name: 'characterAnalogyFlow',
    inputSchema: CharacterAnalogyInputSchema,
    outputSchema: CharacterAnalogyOutputSchema,
  },
  async input => {
    const {output} = await characterAnalogyPrompt(input);
    if (!output) {
      throw new Error('No output from character analogy prompt.');
    }
    return output;
  }
);
