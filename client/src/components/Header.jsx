import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { Avatar } from "flowbite-react";
import { toggleTheme } from "../redux/theme/themeSlice";


import { signoutSuccess } from "../redux/user/userSlice";


const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const path = useLocation().pathname;
  
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm,setSearchTerm]=useState('');
const location=useLocation();
const navigate=useNavigate();

useEffect(()=>{
const urlParams=new URLSearchParams(location.search);
const searchTermFromUrl=urlParams.get('searchTerm');

if(searchTermFromUrl)
{
  setSearchTerm(searchTermFromUrl);
}
},[location.search]);



  const handleSignout = async () => {
    try {
      await fetch("api/auth/signout");
      dispatch(signoutSuccess());
    } catch (error) {
      console.log(error);
    }
  };


const handleSubmit=(e)=>{
  e.preventDefault();
  const urlParams=new URLSearchParams(location.search);
urlParams.set('searchTerm',searchTerm);
const searchQuery=urlParams.toString();
navigate(`/search?${searchQuery}`);

}



  return (
    <Navbar className="border-b-2 ">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Event 
        </span>
        Management
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Search..."
          value={searchTerm}
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2 items-center">
        <Button
          className="w-12 h-10 inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                @{currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Button to="/sign-in" gradientDuoTone="purpleToBlue" outline>
            <Link to="/sign-in">Sign In</Link>
          </Button>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/AllEvents"} as={"div"}>
          <Link to="/AllEvents">Events</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
