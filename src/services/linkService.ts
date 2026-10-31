import { linkBackend } from './linkBackends';
import type { LinkInput, LinkItem } from '../types';

/** Returns a copy of `ids` with `id` placed at 1-based `position` (append when omitted). */
function insertAt(ids: string[], id: string, position?: number): string[] {
  const index =
    position === undefined ? ids.length : Math.min(Math.max(position - 1, 0), ids.length);
  return [...ids.slice(0, index), id, ...ids.slice(index)];
}

export function fetchLinks(): Promise<LinkItem[]> {
  return linkBackend.list();
}

/** Adds a link at 1-based `position`, or at the end when omitted. */
export async function createLink(input: LinkInput, position?: number): Promise<void> {
  const ids = (await linkBackend.list()).map((link) => link.id);
  const newId = await linkBackend.insert(input);
  await linkBackend.saveOrder(insertAt(ids, newId, position));
}

/** Updates a link; moves it to 1-based `position` when given. */
export async function updateLink(id: string, input: LinkInput, position?: number): Promise<void> {
  await linkBackend.update(id, input);
  if (position === undefined) return;

  const otherIds = (await linkBackend.list()).map((link) => link.id).filter((x) => x !== id);
  await linkBackend.saveOrder(insertAt(otherIds, id, position));
}

export function reorderLinks(ids: string[]): Promise<void> {
  return linkBackend.saveOrder(ids);
}
