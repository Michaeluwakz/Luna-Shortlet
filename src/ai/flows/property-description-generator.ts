// use server'
'use server';
/**
 * @fileOverview Property description generator flow.
 *
 * - generatePropertyDescription - A function that generates property descriptions based on key features.
 * - GeneratePropertyDescriptionInput - The input type for the generatePropertyDescription function.
 * - GeneratePropertyDescriptionOutput - The return type for the generatePropertyDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePropertyDescriptionInputSchema = z.object({
  propertyType: z.string().describe('The type of property (e.g., apartment, house, villa).'),
  location: z.string().describe('The location of the property.'),
  numberOfBedrooms: z.number().int().describe('The number of bedrooms in the property.'),
  numberOfBathrooms: z.number().int().describe('The number of bathrooms in the property.'),
  amenities: z.array(z.string()).describe('A list of amenities the property offers (e.g., swimming pool, gym, parking).'),
  uniqueSellingPoints: z.array(z.string()).describe('A list of unique selling points of the property (e.g., stunning views, close to amenities, modern design).'),
});
export type GeneratePropertyDescriptionInput = z.infer<typeof GeneratePropertyDescriptionInputSchema>;

const GeneratePropertyDescriptionOutputSchema = z.object({
  description: z.string().describe('A compelling description of the property.'),
});
export type GeneratePropertyDescriptionOutput = z.infer<typeof GeneratePropertyDescriptionOutputSchema>;

export async function generatePropertyDescription(
  input: GeneratePropertyDescriptionInput
): Promise<GeneratePropertyDescriptionOutput> {
  return generatePropertyDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePropertyDescriptionPrompt',
  input: {schema: GeneratePropertyDescriptionInputSchema},
  output: {schema: GeneratePropertyDescriptionOutputSchema},
  prompt: `You are a real estate copywriter specializing in crafting compelling property descriptions for short-term rentals.

  Based on the provided key features, write an engaging and attractive description that highlights the property's best aspects.

  Property Type: {{propertyType}}
  Location: {{location}}
  Number of Bedrooms: {{numberOfBedrooms}}
  Number of Bathrooms: {{numberOfBathrooms}}
  Amenities: {{#each amenities}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Unique Selling Points: {{#each uniqueSellingPoints}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  Description:`, // The output should be the description itself; do not add any prefix or suffix.
});

const generatePropertyDescriptionFlow = ai.defineFlow(
  {
    name: 'generatePropertyDescriptionFlow',
    inputSchema: GeneratePropertyDescriptionInputSchema,
    outputSchema: GeneratePropertyDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
