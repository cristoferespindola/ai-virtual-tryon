export default function Loader({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null;
  return (
    <div className='inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-6'></div>
  );
}
