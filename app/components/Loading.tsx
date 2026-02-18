interface LoadingProps {
  loadingMessage?: string;
}
export function Loading({
  loadingMessage = "Loading please wait",
}: LoadingProps) {
  return <div>{loadingMessage}</div>;
}
