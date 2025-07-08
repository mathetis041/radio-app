interface Response {
  took: number;
  hits: Hits[];
  query: string;
  version: string;
  apiVersion: number;
}

interface Hits {
  _id: string;
  _score: number;
  _source: Source;
}

interface Source {
  code: string;
  stream: string;
  subtitle: string;
  type: string;
  title: string;
  secure: boolean;
  url: string;
}

export type { Response, Hits, Source };
