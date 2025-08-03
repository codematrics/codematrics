import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Props {
  currentPage: number;
  totalPages: number;
  search?: string;
  category?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  search,
  category,
}: Props) {
  const queryStr = (page: number) =>
    new URLSearchParams({
      ...(search && { search }),
      ...(category && { category }),
      page: page.toString(),
    }).toString();

  const pagesToShow = Array.from(
    { length: Math.min(5, totalPages) },
    (_, i) => i + 1
  );

  return (
    <div className='flex justify-center items-center gap-2 mt-12'>
      {currentPage > 1 && (
        <Link href={`/blog?${queryStr(currentPage - 1)}`}>
          <Button variant='outline'>Previous</Button>
        </Link>
      )}

      {pagesToShow.map(p => (
        <Link key={p} href={`/blog?${queryStr(p)}`}>
          <Button variant={p === currentPage ? 'default' : 'outline'} size='sm'>
            {p}
          </Button>
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link href={`/blog?${queryStr(currentPage + 1)}`}>
          <Button variant='outline'>Next</Button>
        </Link>
      )}
    </div>
  );
}
