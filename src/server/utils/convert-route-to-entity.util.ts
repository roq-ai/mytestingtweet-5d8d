const mapping: Record<string, string> = {
  companies: 'company',
  follows: 'follow',
  media: 'media',
  tweets: 'tweet',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
