'use client';

import { useEffect, useState } from 'react';

interface GitHubShieldsProps {
  repoUrl: string;
  className?: string;
}

interface ShieldData {
  stars: string;
  lastCommit: string;
}

export function GitHubShields({ repoUrl, className = '' }: GitHubShieldsProps) {
  const [shields, setShields] = useState<ShieldData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!repoUrl) return;

    // Extract owner and repo from GitHub URL
    const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) return;

    const [, owner, repo] = match;
    
    setLoading(true);
    
    // Generate shields.io URLs
    const starsUrl = `https://img.shields.io/github/stars/${owner}/${repo}?style=flat&label=stars&color=0366d6`;
    const lastCommitUrl = `https://img.shields.io/github/last-commit/${owner}/${repo}?style=flat&label=updated&color=28a745`;
    
    // Preload images to check if they exist
    const loadShields = async () => {
      try {
        const [starsResponse, lastCommitResponse] = await Promise.all([
          fetch(starsUrl, { method: 'HEAD' }),
          fetch(lastCommitUrl, { method: 'HEAD' })
        ]);

        if (starsResponse.ok && lastCommitResponse.ok) {
          setShields({
            stars: starsUrl,
            lastCommit: lastCommitUrl
          });
        }
      } catch {
        // Silently fail - shields won't be shown
      } finally {
        setLoading(false);
      }
    };

    loadShields();
  }, [repoUrl]);

  if (loading || !shields) {
    return null;
  }

  return (
    <div className={`flex gap-1 ${className}`}>
      <img
        src={shields.stars}
        alt="GitHub stars"
        className="h-4 opacity-80 hover:opacity-100 transition-opacity"
        loading="lazy"
      />
      <img
        src={shields.lastCommit}
        alt="Last commit"
        className="h-4 opacity-80 hover:opacity-100 transition-opacity"
        loading="lazy"
      />
    </div>
  );
}

export default GitHubShields;