import React from 'react';
import { LinkItem } from '../types';

interface LinkCardProps {
  link: LinkItem;
}

const LinkCard: React.FC<LinkCardProps> = ({ link }) => {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="link-card"
    >
      <h2 className="link-title">{link.title}</h2>
      {link.description && (
        <p className="link-description">{link.description}</p>
      )}
      <div className="link-footer">
        <span className="link-url">{link.url}</span>
        <span className="external-icon">↗</span>
      </div>
    </a>
  );
};

export default LinkCard;
