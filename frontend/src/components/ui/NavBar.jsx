import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-scroll'

const navigation = [
    { name: 'About', to: 'features', isScroll: true },
    { name: 'Features', to: 'features', isScroll: true },
    { name: 'Contact', to: 'https://www.ayomidehakeem.dev', isScroll: false },
]

const Navbar = ({ user }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <div>
            <header className="inset-x-0 top-0 z-50 fixed shadow-sm bg-opacity-90 bg-white backdrop-blur-lg">
                <nav aria-label="Global" className="flex items-center justify-between p-3 lg:px-8">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <p className=' text-xl font-extrabold text-indigo-600 '>FirstYear.ai</p>
                        </a>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            item.isScroll ? (
                                <Link
                                    key={item.name}
                                    to={item.to}
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                    className="text-sm/6 font-semibold text-gray-900 hover:text-gray-700 hover:underline cursor-pointer"
                                >
                                    {item.name}
                                </Link>
                            ) : (
                                <a
                                    key={item.name}
                                    href={item.to}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm/6 font-semibold text-gray-900 hover:text-gray-700 hover:underline cursor-pointer"
                                >
                                    {item.name}
                                </a>
                            )
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <button
                            onClick={() => navigate('waitlist')}
                            className="rounded-lg bg-indigo-600 px-4 py-1.5 text-md font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Join Waitlist
                        </button>
                    </div>
                </nav>
                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0 z-50" />
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <p className=' text-xl  font-extrabold text-indigo-600'>FirstYear.ai</p>
                            </a>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {navigation.map((item) => (
                                        item.isScroll ? (
                                            <Link
                                                key={item.name}
                                                to={item.to}
                                                spy={true}
                                                smooth={true}
                                                offset={-70}
                                                duration={500}
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 cursor-pointer"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        ) : (
                                            <a
                                                key={item.name}
                                                href={item.to}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 cursor-pointer"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {item.name}
                                            </a>
                                        )
                                    ))}
                                </div>
                                <div className="py-6">
                                    <button
                                        onClick={() => {
                                            setMobileMenuOpen(false)
                                            navigate('waitlist')
                                        }}
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Join Waitlist
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>
        </div>
    )
}

export default Navbar