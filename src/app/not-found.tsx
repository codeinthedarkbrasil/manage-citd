import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2 className="text-neutral-900">Not Found</h2>
      <p className="text-neutral-300">Could not find requested resource</p>
      <Link className="text-primary-100" href="/">Go back</Link>
    </div>
  )
}
