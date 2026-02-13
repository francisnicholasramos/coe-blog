export type RouteSwitchProps = {
    Header: React.ReactNode;
    pages: Page[]
}

type Page = {
    path: string;
    element: React.ReactNode;
}
