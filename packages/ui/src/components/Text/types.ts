import type { Span, Heading, Paragraph } from '../../types/text';

export type Tag = keyof Heading | 'p' | 'span';
export type Scale = Heading & { p: Paragraph } & { span: Span };