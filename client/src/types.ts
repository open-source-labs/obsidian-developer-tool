export type Route = {
  [key: string]: JSX.Element
};

export type DOMMessage = {
  [key: string]: any
};

export type dashboardProps = {
  [key: string]: string | number | boolean | null
};

export type action = {
  type: string,
  payload: any
};

export type ListItemType = {
  data: {
    date: string,
    time: number, 
    hit: boolean, 
    query: string, 
    mutation: boolean
  },
};

export type DisplayRouteType = {
  [key: string]: JSX.Element
};

export type NavbarProps = {
  currentlyOpen: keyof Route,
  setCurrentlyOpen: React.Dispatch<React.SetStateAction<keyof Route>>,
  algo: string
};

export type State = {
  totalQueries: number,
  totalHits: number,
  queryMetrics: Array<{date: string, time: number, hit: boolean, query: string, mutation: boolean}>,
  hitSize: Array<number>,
  missSize: Array<number>,
  mutationSize: Array<number>,
  open: {[key: string]: number | boolean | string }
};