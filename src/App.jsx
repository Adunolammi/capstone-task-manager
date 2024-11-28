import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route , useLocation, Navigate, Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import { IoClose } from "react-icons/io5";
import Dashboard from './pages/Dashboard';
import TaskDetails from './pages/TaskDetail';
import Tasks from './pages/Tasks';
import Trash from './pages/Trash';
import Users from './pages/Users';
import Login from './pages/Login';
import Sidebar from './components/sidebar';
import Navbar from './components/Navbar';
import { setOpenSidebar } from "./redux/slices/authSlice";
//import { IoMdClose } from 'react-icons'




function Layout() {
  const { user } = useSelector((state) => state.auth); // Replace with actual user state or authentication check

  const location = useLocation(); // Get the current location

  return user ? ( // If user exists
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-1/5 h-screen bg-white sticky top-0 hidden md:block">
        <Sidebar />
      </div>

      <MobileSidebar />
      <div className='flex-1 overflow-y-auto'>
        <Navbar />
        <div className='p-4 2xl:px-10'>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/log-in" state={{ from: location }} replace />
  );
}

const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <>
    <Transition
        show={isSidebarOpen}
        as={Fragment}
        enter='transition-opacity duration-700'
        enterFrom='opacity-x-10'
        enterTo='opacity-x-100'
        leave='transition-opacity duration-700'
        leaveFrom='opacity-x-100'
        leaveTo='opacity-x-0'
      >
        {(ref) => (
          <div
            ref={(node) => (mobileMenuRef.current = node)}
            className={clsx(
              "md:hidden w-full h-full bg-black/40 transition-all duration-700 transform ",
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            )}
            onClick={() => closeSidebar()}
          >
            <div className='bg-white w-3/4 h-full'>
              <div className='w-full flex justify-end px-5 mt-5'>
                <button
                  onClick={() => closeSidebar()}
                  className='flex justify-end items-end'
                >
                  <IoClose size={25} />
                </button>
              </div>

              <div className='-mt-10'>
                <Sidebar />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  )
};

function App() {

  return (
    <main className='w-full m-h-screen bg-[#f3f4f6]'>
      <Routes>
        <Route element={<Layout />}>  {/* anypage that falls into this route we check from the layout */}
          <Route index path='/' element={<Navigate to='/dashboard' />}/> {/* when every we go to / we want to redirct it to dashoard  */}
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/completed/:status' element={<Tasks />} />
          <Route path='/in-progress/:status' element={<Tasks />} />
          <Route path='/todo/:status' element={<Tasks />} />
          <Route path='/team' element={<Users />} />
          <Route path='/trashed' element={<Trash />} />
          <Route path='/task/:id' element={<TaskDetails />} />
        </Route>
        <Route path='/log-in' element={<Login />} />
      </Routes>

      <Toaster richColors />
    </main>
  )
}

export default App
