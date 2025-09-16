import { graphql } from '@octokit/graphql';
import { GitHubRepository, GitHubResponse } from '../src/types/project';

const GITHUB_TOKEN = process.env.GH_TOKEN;

if (!GITHUB_TOKEN) {
  throw new Error('GH_TOKEN environment variable is required');
}

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${GITHUB_TOKEN}`,
  },
});

const REPOSITORIES_QUERY = `
  query GetRepositories($first: Int!, $after: String) {
    user(login: "jjwprotozoa") {
      repositories(
        first: $first
        after: $after
        ownerAffiliations: OWNER
        orderBy: { field: PUSHED_AT, direction: DESC }
      ) {
        nodes {
          name
          description
          stargazerCount
          pushedAt
          isArchived
          isFork
          homepageUrl
          openGraphImageUrl
          url
          repositoryTopics(first: 50) {
            nodes {
              topic {
                name
              }
            }
          }
          object(expression: "HEAD:.project-manifest.yml") {
            ... on Blob {
              text
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

export async function fetchAllRepositories(): Promise<GitHubRepository[]> {
  const allRepositories: GitHubRepository[] = [];
  let hasNextPage = true;
  let endCursor: string | null = null;

  while (hasNextPage) {
    try {
      const response: GitHubResponse = await graphqlWithAuth(REPOSITORIES_QUERY, {
        first: 100,
        after: endCursor,
      });

      const { nodes, pageInfo } = response.data.user.repositories;
      
      // Filter out forks and archived repositories
      const filteredNodes = nodes.filter(repo => !repo.isFork && !repo.isArchived);
      allRepositories.push(...filteredNodes);

      hasNextPage = pageInfo.hasNextPage;
      endCursor = pageInfo.endCursor;
    } catch (error) {
      console.error('Error fetching repositories:', error);
      throw new Error(`Failed to fetch repositories: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  return allRepositories;
}

export async function testConnection(): Promise<boolean> {
  try {
    const response = await graphqlWithAuth(`
      query {
        user(login: "jjwprotozoa") {
          login
          name
        }
      }
    `);
    
    console.log('GitHub connection successful:', response);
    return true;
  } catch (error) {
    console.error('GitHub connection failed:', error);
    return false;
  }
}
