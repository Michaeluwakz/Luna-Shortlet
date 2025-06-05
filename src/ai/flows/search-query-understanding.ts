// src/ai/flows/search-query-understanding.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for understanding user search queries for shortlet apartments.
 *
 * The flow takes a natural language search query as input and extracts structured information such as location,
 * price range, number of guests, and amenities.
 *
 * @interface SearchQueryUnderstandingInput - The input type for the searchQueryUnderstanding function.
 * @interface SearchQueryUnderstandingOutput - The output type for the searchQueryUnderstanding function.
 * @function searchQueryUnderstanding - A function that processes the search query and returns structured data.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SearchQueryUnderstandingInputSchema = z.object({
  query: z.string().describe('The natural language search query from the user.'),
});
export type SearchQueryUnderstandingInput = z.infer<
  typeof SearchQueryUnderstandingInputSchema
>;

const SearchQueryUnderstandingOutputSchema = z.object({
  location: z.string().optional().describe('The desired location of the shortlet.'),
  minPrice: z.number().optional().describe('The minimum price for the shortlet.'),
  maxPrice: z.number().optional().describe('The maximum price for the shortlet.'),
  guests: z.number().optional().describe('The number of guests the shortlet should accommodate.'),
  amenities: z
    .array(z.string())
    .optional()
    .describe('A list of desired amenities for the shortlet.'),
});
export type SearchQueryUnderstandingOutput = z.infer<
  typeof SearchQueryUnderstandingOutputSchema
>;

export async function searchQueryUnderstanding(
  input: SearchQueryUnderstandingInput
): Promise<SearchQueryUnderstandingOutput> {
  return searchQueryUnderstandingFlow(input);
}

const searchQueryUnderstandingPrompt = ai.definePrompt({
  name: 'searchQueryUnderstandingPrompt',
  input: {schema: SearchQueryUnderstandingInputSchema},
  output: {schema: SearchQueryUnderstandingOutputSchema},
  prompt: `You are an AI assistant designed to extract structured information from user search queries for shortlet apartments.

  Your task is to identify the following information from the user's query:
  - Location: The desired location of the shortlet.
  - Price Range: The minimum and maximum price for the shortlet.
  - Number of Guests: The number of guests the shortlet should accommodate.
  - Amenities: A list of desired amenities for the shortlet.

  Here is the user's search query:
  {{query}}

  Please extract the relevant information and format it according to the output schema.
  If a piece of information cannot be found, omit it from the output.  Do not assume.
  If the user specifies a price range like \"500 to 700\", then populate both minPrice and maxPrice accordingly.  Do not include currency symbols like \"$\" or \"£\" in minPrice or maxPrice.
  If the user asks for a specific amenity, be sure to include it in the amenities array.
  If you are unsure about a specific amenity, do not include it in the amenities array.
`,
});

const searchQueryUnderstandingFlow = ai.defineFlow(
  {
    name: 'searchQueryUnderstandingFlow',
    inputSchema: SearchQueryUnderstandingInputSchema,
    outputSchema: SearchQueryUnderstandingOutputSchema,
  },
  async input => {
    const {output} = await searchQueryUnderstandingPrompt(input);
    return output!;
  }
);
