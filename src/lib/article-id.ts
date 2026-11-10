/**
 * Permanent Article IDs look like `a_` followed by a random token. They never change, so a task, a link or a note can
 * refer to an article safely even after the article is renamed. This module only checks the shape; the database decides
 * whether an article with that ID exists.
 */
export const ARTICLE_ID_PATTERN = /^a_[A-Za-z0-9_-]{8,40}$/;

export const isArticleId = (value: string): boolean => ARTICLE_ID_PATTERN.test(value.trim());
