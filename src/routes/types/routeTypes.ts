export type RouteSwitchProps = {
    Header: React.ReactNode;
    pages: Page[];
    Footer: React.ReactNode;
}

type Page = {
    path: string;
    element: React.ReactNode;
}
