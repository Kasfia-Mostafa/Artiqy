/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Artiqy from "../../assets/Artiqy.png";
import "../../Styles/logout.css";
import "../../Styles/underline.css";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import CreatePost from "../Feed/CreatePost";
import { setPosts, setSelectedPost } from "@/redux/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RootState } from "@/redux/store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const { likeNotification } = useSelector(
    (store: RootState) => store.realTimeNotification
  );

  // console.log(user._id);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  //* Logout
  const logoutHandler = async () => {
    try {
      const res = await axiosPublic.get("/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Logout failed:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data);
      } else {
        const err = error as Error;
        console.error(err.message);
      }
    }
  };

  return (
    <div className="flex">
      {/* Hamburger Icon for Mobile */}
      <div
        className="absolute top-5 left-5 text-4xl cursor-pointer lg:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <img
            className="size-6"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAABKklEQVR4nM2WUU7DMAyGcy4YEi/sDGggddfB7vM0LrA/3T2AcYPau8W67QUkWOiKWmjVakmmRbIU1ZK/Ovnt2JjjIs0eWfFOgj2r/fIxEuxJ7SpV+1DFP0Lss29w7jTMa5nEgtgyQ8XEZbOKDWLBqwlxJ9wP2pnoEC3tMkAk+CTBlBRjUhQtl1w4H0uWsOLDBzStSiDNl6M6jBTFk+Cm8pewU0GKcb3eKpgzt2/4dHHnA/ofMF+O2r6xYuMlBlK75TVuG62ktii3132QwarrgtFAiDcoXeMqGKjv6NKBsGBioJY6iyJvcoV78tFJlnT9Nf2BeRXsT1uRLInegjigmbOB6FwPHwneYoNI7ItxI1H8jOx9KU3FPCJk1myQiombVkINkC7WbyYHwDfvQCGxDvHGFgAAAABJRU5ErkJggg=="
          />
        ) : (
          <img
            className="size-6"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABD0lEQVR4nO3WzUoCYRgF4LkIJ5qoqCgsKiqSis8byK6uKSIiIiJCQiQiIkIkRMTGG3DK32bsf0od3R+haDmTuOnDzgPv/hx4F0dRiIiI+oXItjfChmuHjRZ+O5F1sZZpYjXdwEqqjtDNJ5aTH1hKOFi8fsfC1RvmL18xd/GC2fNnzJw9YTr+iGCshqnTGiajNiZOLIwfP2DsqIrRwwpGDsoY3i9haK8IbbeAwZ17DGzfQdXN79vM24EtM+JZQOrw+s/lLZ8Csoc3v67nAjKEV/0LeL+QLOFV3xfKtSPi1rVkDq/q5rpnASKivyW4hRxuIY1byOAWArcQEf1TglvI4RbSuIUMbiFwCxERESnd6QAvOAk1rIvKdgAAAABJRU5ErkJggg=="
          />
        )}
      </div>

      {/* Sidebar */}
      <div className="">
        <div
          className={`fixed top-0 left-0 rounded-2xl w-80 bg-wall transition-transform transform min-h-screen
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:w-full z-50`}
        >
          <div className="p-5 text-sky-800">
            <div className="flex justify-between items-center">
              <img
                src={Artiqy}
                className="w-28 h-10 rounded-tr-2xl rounded-bl-2xl"
                alt=""
              />
              <span
                className="text-2xl cursor-pointer text-white lg:hidden"
                onClick={toggleSidebar}
              >
                <img
                  className="size-6"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAABKklEQVR4nM2WUU7DMAyGcy4YEi/sDGggddfB7vM0LrA/3T2AcYPau8W67QUkWOiKWmjVakmmRbIU1ZK/Ovnt2JjjIs0eWfFOgj2r/fIxEuxJ7SpV+1DFP0Lss29w7jTMa5nEgtgyQ8XEZbOKDWLBqwlxJ9wP2pnoEC3tMkAk+CTBlBRjUhQtl1w4H0uWsOLDBzStSiDNl6M6jBTFk+Cm8pewU0GKcb3eKpgzt2/4dHHnA/ofMF+O2r6xYuMlBlK75TVuG62ktii3132QwarrgtFAiDcoXeMqGKjv6NKBsGBioJY6iyJvcoV78tFJlnT9Nf2BeRXsT1uRLInegjigmbOB6FwPHwneYoNI7ItxI1H8jOx9KU3FPCJk1myQiombVkINkC7WbyYHwDfvQCGxDvHGFgAAAABJRU5ErkJggg=="
                />
              </span>
            </div>
            <hr className="my-6 border-slate-300" />

              {/* Search Input */}
              <div className="flex items-center bg-[#c8e1e0]  p-2 mt-3 rounded-md">
              <img
                className="size-6"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADRElEQVR4nO3Y22/TZhzG8dwNJOA6pVxNDWPAoNXKX4KAIiFNO4gAZWyM4xg0qlgHlGaitJQ0TsmBISH2BwxxQdWbFkWTQByEpqQLidODk7ImxGnjOOE7GVaxCyYx/MYmIo/0u/PF87Ff+7XtcDTSSCM1ST+s8mvsDOhIAZ3oFZ1MUKccrFAOVciEKkRDVfwR6AjASse7koESa30lRoZLFP0aSGUY0V/OlQoEjalC6J8JP4dIlWIYAtfAZVtxLywfKNJ3aQF9aBF8JRjW4I0RzyEC5Qj0BmGZpeUv5HH1qzy4WITBBbi0CCYQRGDiKjRZUr5Ppc1bIHNBhX4VBCLkEGyqaflzeVznc2S8z+DnAtQCEQRnTcp7Eiw7m+Nebx768lBDxO83YLlwwI9z9J35C87mwAJEt9DyngxrT2fRe56CFYgwFIQupS6Fke4snJ4DCxFDQsp75lh1SqHoyYCViHAVVciO/cMsO0/OQpcCliNgh2nA8WmkEzNgC6LKsGnAkTTR49NgC6LChGnAYZns0SmwAxGsoJgGfCejHU6DLYgKJdOAb1Noh2SwBaELABx4QvZgCuxAjOgCltD+BNFvkmATYsI0oHMS/9cJsAnhMw3YE6ej80+wAxHQ2GYasO8hK/bEUa1G+Eqog7DCISK74wT2ToLFCL9DVNxxXO44ZasQgwtoQ4t86BCZL2P0uuNgBWKgyBmH6Gy6fm/jtmhOqzmiwHg/fCC0fOutjOvjXx+nXeEou+4vUDPEM6a8RZqFlm8bzbW0j+XSrTdn+Oj6Izb8cpdd9xeFI87nSXkLfCK0/Bop1fLpaG58y1geYzb/Nv0C4QpG2RqdLwlDzDPeqwr+ndJ8WXY5pWR6TTCVbb89H1tCGFdi3Y3HcuvVh+u/itHtjqO+NSKL1vOUn4Sv+aXyTVIKY/6NaB/Ly22jSsvSsZ8lcLpjDP3PzU7tUhj2zAp+VL6u/CuEnDWWk3FP/NeOvTfGjs5JfPsT3DmQRDFexV98T8goR6e4c2yKy9/PsN2jCNph37S8MU4pKRv3hONdTXOjvE1pruczb8TpT8bqtryR1VLq8yYpWa3L8q9D1F35pawOpL5wSsk/6rJ8I428R/kbS3ZQJf3ee90AAAAASUVORK5CYII="
              />
              <input
                type="text"
                placeholder="Search"
                className="ml-2 bg-transparent text-slate-800 focus:outline-none"
              />
            </div>

         
            {/* Menu Items */}
            <div className="space-y-4 mt-6 grid grid-cols-2 md:grid-cols-1 lg:grid-cols-1">
              <div>
                <Link to="/">
                  <div className="flex items-center p-2 rounded-md  cursor-pointer">
                    <img
                      className="size-6"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADSklEQVR4nO2U708bdRzHL/Ghcf+GD/eERKfoJguFskKvHW2F/uDaQccsCDgiEFY3cIMpGoWkmBH8sbkMdu3d0Q7SLeicIybzsQ/2x9wlL3MmSxrlFu5G+y2GV/J68Pl+v/fO+5vLnSQd8z8m/jMnEnd4XTqKJAzkqMp4pGhNKBrt0lFCKROWiwz4NpFtQyqDyTIB6Sig6FYkpFmpjg0zWGtItQYVw+z49/mUbo18qFnjLxzQyIlpLknSQAX5vE6ic5Pu/exVSSsGXbXPJDQmas/Ys5jyBnJII+7bIPAyIypKWsf/4rm4xnjtvj03vHxaIxRWrWTHPfPcQYzcZ0DRzH8+7HjJGqvds+eGlld0gr0qcf8GfjdGVVKZCmeTGqO16/bcsPIZA1kuWn0+1ez0YlSzUv2alatdi2tWYy6Q0egJl4h1FvG9ioEi/to5sdWAv5Bi0B0pEfOrtB+2SYOP6lo+XSYQKxMJFDlbD1M6l+pavlcn4ldpq5dJneH6lNfNQLhknu/aND+op5H7VvSCwZlDLX/RoKtfJxxQOd0I+3UiQxVOH0r5XJWOvgpyV4n3G2mySvjjXVpfqfwnD2lPPaAnoNMqwswO8vQTTnkqP/srbekdAt0l3hXp4DbB/K7LS3z+O21jG1YsWzDDl1asmEizBTM8VrT65g76JpZ+48z0XZKzNxi9cZX565+xKNKFa8zNLjJ6ZQNl6SlvvbT8l39yalIjlL/OyNI0a8tTbC9P8otQp9j+aoZb+QVGZnSiX+9xct/yy884ceUJPblVehaucXV5kgeFYaxCFoQ6jGV3sTvZ3eb/QFbhtf9cYP05b8zt0T3xLaEv8syvXKa6OgTN4MplqnYnu9viM4L7XsDm+784ubpFZv07vrl9k8c/fgrN4O2bPLY7FQwurD/nTemglC9CMyh55eEUNIOSV3bz0AxKXnk0A82g5JXqJDSDkld2xqAZlLxSyUEzKHllKwtuNYZ4xylPz9LqJVPyip4Bt4rIdKSUBLeKyHRE7QO3ish0ZLMX3Coi05F7QXCriExH7p4Dt4rIdOSOD9wqItORn9rArSIyHfnhPXCriExH1t8Gt4rIdGSthb21Fjiot1p4KiLzmGMk7/wNXrx+K0Y3yIkAAAAASUVORK5CYII="
                    />
                    <span className="underline-container ml-2 text-xl">
                      Home
                      <span className="underline"></span>
                    </span>
                  </div>
                </Link>
              </div>

              {/* Profile */}
              <div>
                <Link to={`/profile/${user?._id}`}>
                  <div className="flex items-center p-2 rounded-md cursor-pointer">
                    <Avatar className="w-6 h-6">
                      {user?.profilePicture ? (
                        <AvatarImage src={user.profilePicture} alt="Profile" />
                      ) : (
                        <AvatarFallback>
                          <img
                            className="size-6"
                            src="https://img.icons8.com/3d-fluency/94/user-male-circle.png"
                            alt="user-male-circle"
                          />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <span className="underline-container ml-2 text-xl">
                      Profile
                      <span className="underline"></span>
                    </span>
                  </div>
                </Link>
              </div>

              {/* Create Post */}
              <div className="flex items-center p-2 rounded-md  cursor-pointer">
                <img
                  className="size-6"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACrklEQVR4nO2Yz0/TYBjHe/ZE3zFINCZoRHECowUTz7LWA/MEXtRJ2yVkEQQOih48QLbgH6Am+wckUS+ePIksasJB+RF3oC9RDi0knkx03h/zvl1xM0zaTt+3i32SN1nbpPt83uf7vt0qCC1Qkpo9JaX0N7KiVeSU9vyCmkVCq1T/cOa0rGh7sqLD/kjpG+eHMzEh7DV0yTjjwkspfdk51nH1eC3UnRj6DX4wPXGEnJdSxlFXgsRJaCV4twbV8R7nmvZd+FO1be9eFrG1ImLrB8I2sBidbzcgOTZNs57I3v8aXy2P1jIRGSLlrAet1BBeNK1FVtDoIPjJPMTKO/S8aNqFA+D3yO7UcOZZw3fUwufmIfbxc9110glZ0V/R6Cjal4GLeqLx7GNrJUzwsfIOjZMn+KpAhRn8u83D4acK4BmeFFP4KzOe4JOjU+AJnpWAX/jO0jp4gmchEAQeYTscAkHhURgEmoFHvAWahUc8Bf4GPOIl0LFart/nqz8P6uAn8w782DR9qDW6F3sB04LEzYX9PyK9mTlo/7AVCB7xEDj2olSNxS3ou3GXfu67Pgfx91u+4REPgbMzixTwxKMliK+Z0Dt+z5G4dgfO5RYOzTxXATKjsmqANDIB8XVMz5H4kBi5kUp6nHkuAt2FIoXsnn9Mj4nEyYdLNE5B4BFLgfbNTzCQztEOHH/ykkqQTrgzTxY22Z2Qz/syE+gqPnNgVePXqxDVgJ7ZB3Rhk90pyH0FVgJkkbrgpBMkTn7jgngKkIj0X70NXcWnNE7N3g+xFvhXQ4gEcNQBiCLkpXhHBUWLGPOfbRRto5j/jKP/9kEmMny5izwO0bS/+RF4HToBbC17Fmjb3k2HT8Ae8SxAu2DahRDFJ+8LvrYTpHU81oSIrYrz3T5nPqqoohJaqn4CiniFdVLs//QAAAAASUVORK5CYII="
                />
                <span className="underline-container ml-2 text-xl">
                  <CreatePost open={open} setOpen={setOpen} />
                  <span className="underline"></span>
                </span>
              </div>

              {/* Message */}
              <div>
                <Link to="/chat">
                  <div className="flex items-center p-2 rounded-md  cursor-pointer">
                    <img
                      className="size-6"
                      src="https://img.icons8.com/parakeet/48/chat-message.png"
                      alt="chat-message"
                    />
                    <span className="underline-container ml-2 text-xl">
                      Messages
                      <span className="underline"></span>
                    </span>
                  </div>
                </Link>
              </div>

              {/* Notification */}
              <div className="flex items-center p-2 rounded-md  cursor-pointer">
                <img
                  className="size-6"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAACdUlEQVR4nO2U204TURSG+xDGBA94IIVC6QEqVpS00ACTVCOgcG18A95Ar7nwCeAtrPF0gQlIqKWNtYHSQjCAYmqhBYqKpf5mdZhO98yedldK4gUr+S9mLta31r/XWibTWfxvgezANLb7gIQdWLLqtWwDko65+kNTHhSV7gU+31CBVEi0BQg2yqoXHOVQRd+9wLceIOkEQtdUaL3g0EJ3JeDXfeDoAZAfAb7eJojcdcwChK6eHI4D/ysc+IH8MPBnFMAYqx93ZdvjNtX2OFnvkIuh77Wu6dqg+yPnubByZftVJ3jDRlp0AHHXOXHwnt+Dn/eMoVQUvbPy3isdfPCcBYi7e8TBucHHSHuMwYdD7LCR5bpu7cCLC8Ci61ENVktPiwl/D/PB+xILTnmB9Zss+EMbEGgAYp1ParBamiomzPj4YDok2hWjf6Uho24vyuCPjklxcHYwUEpYeMhCaZW0UEVbd2Rw2CpDSWHbc3Hw7kCwlCzn16+REZjeOuEEXl5SwaH2eXFwpn+FSWi0RjqwF1h1q1DSfGtSHLzjSzEJaYq1a6QFks2RJvlqLRwPFmm2OSUO3u7LsYl9xmv0pRtY4NxrBf6uKScOTvfmdV3RUClrRMB1N3ubeSL42yt5cTDPzj0J2PEBa67KMB3cciQGxei4bm/pkNBQ0a5udhvfZp3agWAr8KlzXAA8ltEBeceiWgExO/CmUX7nGXNGrFsjoFABx12Wr1SgoXLXOBzaEgLyCti4xXap1UyVris6smTd4A5QpAWIOpb/OXG1wGZXM8LXCwxw1gy8vlxAwtlmOs3AascEIhbgvVm1Mep8dqrQszCdIP4Cj6MOrCq840oAAAAASUVORK5CYII="
                />
                <span className="underline-container ml-2 text-xl">
                  Notifications
                  {likeNotification.length > 0 && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          size="icon"
                          className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600 absolute bottom-6 left-6"
                        >
                          {likeNotification.length}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div>
                          {likeNotification.map((notification) => (
                            <div
                              key={notification.userId}
                              className="flex items-center gap-2 my-2"
                            >
                              <Avatar>
                                <AvatarImage
                                  src={
                                    notification.userDetails?.profilePicture ||
                                    "fallback-image-url"
                                  } 
                                />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                              <p className="text-sm">
                                <span className="font-bold">
                                  {notification.userDetails?.username ||
                                    "Unknown User"}{" "}
                                </span>{" "}
                                liked your post
                              </p>
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  )}
                  <span className="underline"></span>
                </span>
              </div>

              {/* Bookmarks */}
              <div className="flex items-center p-2 rounded-md  cursor-pointer">
                <img
                  className="size-6"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABN0lEQVR4nO2ZMUoDQRSGlxRiY2FloaU2aeXNBAl4A4/gFbyCV8gV7ESsvIJH0MpCzL4XAiGy7nuLCOLIYCEEVGRm1wT/D165/7x/9uumKAAA/wtXNjskdkFstRMLOYZiFtulL5/2ulh+nmtxt1hEbD4YN9utFYg339by7nPO2yuQUZtvpmqtQAfLhzgo8BX4AwKF0oBCAoXSgEIChdKAQgKF0oBCAoXSgEIChdKAQgKF0oBCAoXSgEKyKgqxvjnRKy/10E+afWI9I9bXFSigL3FZN6n7i98OxtWuYxuR6PPSFaCPF5ZRfAD5KcNPdYtET0ns8c8LENs0LjN8qDZ/m3Uwm2140RMSLTsvQGJ38fDD+7Cemtm/CWuutGNiu22/ANu15+aoCKGXPTyEXsyOZ2TPBgAUS8s7XSr1tOygD/UAAAAASUVORK5CYII="
                />
                <span className="underline-container ml-2 text-xl">
                  Bookmark
                  <span className="underline"></span>
                </span>
              </div>

              {/* Trends */}
              <div>
                <Link to="/trends">
                  <div className="flex items-center p-2 rounded-md  cursor-pointer">
                    <img
                      className="size-6"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB0UlEQVR4nO2WzUoDMRSFB0EfJRFBN24EdW91oViFrjutPkKX3Sg41p110SY7XRUhaZ0BsS+gT1ChtouqD1A6nY2LyB20Ypn+TDtk+pMPDgwhZO4hyc3RNIVCMXvETXtPt5yPhOWIbumm85607IjM+b6BRbwW78hsN2TO903fxX8kc75vlAFL7YCY7yOkT3sXSlp2pOdPzHZDN+0dmfMVCtnEVRZyVBbS5vohSygDzuzuQGGlsJQ6qwsj9iKut8sit/rgCr5hLHVeFyclezKzEMUsSjCvUcxFP91sPH6R5eLhyAaCzjan981divjVoMJplwjimbSWXtDCZpTi6Z+McIvHLNpdVOuz7YoOOU4ROwileLiwFPO3sQ1gVoe1pGch6DZeBQ4r+s9E8Vh6FzJiz4EZIIjdSX8HsptPnhfT/xHiYOBVuoH8mhmYAYp4a6oNEMya0g1kt8rB7QBmFekGINsE14XYrfQuBMEsKAN5zI+kZ6FkyXaD2bhHiGBe8/WQBQmkynEN5FFxP5TiOyYQz3hfTD5QBPMLLWwgEhPELkcwYExEnP4FUiVFrDqwcMSqoR+bXuTWc4sQzCDbUMwq8MK6wqwCY9BtYE7YdSoUCk0O3/pMmk9u/yv9AAAAAElFTkSuQmCC"
                    />
                    <span className="underline-container ml-2 text-xl">
                      Trending
                      <span className="underline"></span>
                    </span>
                  </div>
                </Link>
              </div>

              {/* Suggations */}
              <div>
                <Link to="/suggestions">
                  <div className="flex items-center p-2 rounded-md  cursor-pointer">
                    <img
                      className="size-6"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAChElEQVR4nO2Vy27TQBSGLZDoHnZQHoINQoI3ABsKYtkNLGkAVRVKymLGVCAEK3iMriFsaqcSuVBxmbFikhmDI4TYVDYLSFnQzaDjuhdIYo+dpLLQfNIvRc7Mmf/M5RxNUygUCoVC8R9R8qozldC+UwmsN5XQ3ooU/bZK8J9WZO6FtdlyYDuV0BbDVA4tshyundKKSMmrziSZP5hEIU+iHNq308zvJ7G2oBWNcmBvSCcQWK1DNWeyD5cRo+uIky0Q5rRmelT/K4HQ6sufgNXPGj83iNPHmFMxVIw8zJVAYP/IGj8XsDMjg8dCHr2U9wqZGeLnAo41dQFObRgLdT7rI0YZ4ucCc9JPX4D83CujoUVkyigSq8eyxs+FzAKY0b37DE0qKYl/GxnOGD9HArSWugAn1sE5sLtwReCew8OOHndgN+Hb7s6PEz8TUMrSFjA5uVjU+BFQyhKOd0UbEzzl+BFQyqAa7NzZSNbYO3OI8aVAQhzRm5/PG3X/qdHwW3q9t6nXe79jbUbfGv4TGANjtaJwfVUc1V/7N/VG76vR6AkZ7Yz1b8DcqZpD3fcnEScLmJNXmJPu7hEjRjuIk+qi0zaNut+RNT4o3737sW2Oio8ZuQUeMht/1Nk4gRh5jjjdHvXAFtuumGv6OY3va67pR7ESOvE2ZuQZct3jUuYfePQM4vRLUmlbcl1xZQLmjVgQa8ltJ3dkRr8hTs4mXxnPOZfWHZc7jrjampx5I9a1li/ud520rvwLMXphqPmVT+3TmJPvaY1l/q03cfNGrPl3XkpXjhQgz5kdSAAz+lJi8tTMG7FkPCBGXwwmIDGxKAlgToVKwFAn0JvsFVIoFAqFQqHQMvMH/avT6lZ4jNIAAAAASUVORK5CYII="
                    />
                    <span className="underline-container ml-2 text-xl">
                      Suggestions
                      <span className="underline"></span>
                    </span>
                  </div>
                </Link>
              </div>
          </div>
           
            <hr className="my-6 border-slate-300" />
            <div className="flex items-center p-2 rounded-md cursor-pointer">
              <button className="cta" onClick={logoutHandler}>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
