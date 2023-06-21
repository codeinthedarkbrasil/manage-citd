import Link from 'next/link'

export default function Home() {
  return (
    <div className="font-sans flex flex-col justify-between text-neutral-900">
      <ul>
        <li>
          <Link href='/events'>Events</Link>
          <Link href='/events/2023'>Code in the Dark 2023</Link>
        </li>
      </ul>
    </div>
  )
}
