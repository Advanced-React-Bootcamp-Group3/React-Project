import clsx from "clsx";
import type React from "react";
import { createElement, type PropsWithChildren } from "react";

import type { Color } from "../../types/color";
import type { Heading, Paragraph, Span } from "../../types/text";
import classes from "./style.module.css";

export type Tag = keyof Heading | "p" | "span";
export type Scale = Heading & { p: Paragraph } & { span: Span };

export type TextProps<T extends Tag> = PropsWithChildren<{
  tag: Tag;
  scale?: Scale[T];
  maxRows?: number;
  align?: "center" | "left" | "right";
  transform?:
    | "initial"
    | "lowercase"
    | "uppercase"
    | "capitalize"
    | "capitalize-first-word";
  testId?: string;
  color?: Color;
}> &
  React.HTMLAttributes<
    HTMLSpanElement | HTMLParagraphElement | HTMLHeadingElement
  >;

export const Text = <Type extends Tag = Tag>(props: TextProps<Type>) => {
  const {
    children,
    className,
    scale,
    testId,
    maxRows,
    align = "initial",
    tag,
    transform = "initial",
    color = "initial",
    ...rest
  } = props;

  return createElement(
    tag,
    {
      "data-testid": testId,
      className: clsx(
        className,
        classes[`${tag}-${scale}`],
        classes.text,
        classes[align],
        classes[transform],
        color,
        { [classes.maxRows]: maxRows },
      ),
      style: { WebkitLineClamp: maxRows },
      ...rest,
    },
    children,
  );
};

Text.displayName = "Text";