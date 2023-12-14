/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';
import { FaShoppingCart, FaLocationArrow,FaMobileAlt, FaInstagram, FaDiscord, FaLinkedin } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaHeart  } from "react-icons/fa";
import AboutImg from "../../images/shop.svg";
import SecondhandImg from "../../images/Secondhand-2.png";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-10 p-40 px-3 max-w-6xl mx-auto place-items-center'>
      <img
          src={SecondhandImg}
          alt="secondhand img"
          className="rounded-lg mb-6"
                />
        <div className='text-gray-400 text-md md:text-md place-items-center text-center'>Immerse yourself in the narratives woven into each second-hand gem, adding character and history to your finds. At our unique collection, we invite you to rediscover quality, uniqueness, and the joy of sustainable living. Recharge your connection with meaningful possessions as you indulge in the distinctive stories behind every preloved item, turning each acquisition into a special chapter of your own narrative. "Step into a world where ordinary becomes extraordinary – a realm of timeless charm and sustainable living. Our carefully curated collection of preloved treasures invites you to immerse yourself in the narratives of second-hand splendor. Each item tells a unique story, adding character and history to your discoveries. Recharge your senses as you explore the distinctive tales behind every preloved gem. Join us on this journey of rediscovery, where the ordinary transforms into the extraordinary, and every acquisition becomes a cherished chapter in your personal narrative. Embrace the joy of mindful living and surround yourself with the beauty of thoughtfully chosen, preloved possessions."
    </div>
    <Link
     className="bg-yellow-300 text-white p-3 rounded-lg text-center hover:opacity-50 hover:text-black"
      to={'/about'}
      style={{ width: `12rem`, height: `3rem` }}>
      Get Started
    </Link>
      </div>

      {/* swiper */}
      {/* <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
          
      </Swiper> */}

    <div className="min-h-[550px]">
        <div className="min-h-[550px] flex justify-center items-center backdrop-blur-xl py-12 sm:py-0 ">
          <div
            data-aos="slide-up"
            data-aos-duration="300"
            className="container"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Image section */}
              <div>
                <img
                  src={AboutImg}
                  alt="about img"
                  className="max-w-[430px] w-full mx-auto drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)]"
                />
              </div>
              {/* text content section */}
              <div className="flex flex-col justify-center gap-6 sm:pt-0">
                <h1 className="text-3xl sm:text-4xl font-bold">
                  Re-Loved, Story.
                </h1>
                <p className="text-sm text-gray-500 tracking-wide leading-5">
                Re-loved is your online destination for cherished items with a history. We bring together a diverse array of pre-owned treasures, each with its own story to tell. Discover a curated marketplace where people buy and sell gently used goods, giving new life to preloved items. Whether you're hunting for unique vintage finds, quality second-hand furniture, or fashionable clothing with character, Preloved offers a sustainable and community-driven platform for those who appreciate the beauty of previously owned possessions. 
                  <br />
                  <br />
                  Join our community and embark on a journey of rediscovery, where every preloved item becomes a part of a new chapter in its story.
                </p>
                <div className="flex gap-6">
                  <div>
                    <FaShoppingCart className="text-4xl h-20 w-20 shadow-sm p-5 rounded-full bg-violet-100 dark:bg-violet-400" />
                  </div>
                  <div>
                    <FaShoppingBag className="text-4xl h-20 w-20 shadow-sm p-5 rounded-full bg-orange-100 dark:bg-orange-400" />
                  </div>
                  <div>
                    <FaHeart  className="text-4xl h-20 w-20 shadow-sm p-5 rounded-full bg-green-100 dark:bg-green-400" />
                  </div>
                </div>
                <div>
                  
                  <Link
                    className="bg-yellow-400 text-white  text-center font-bold py-2 px-4 rounded-full hover:scale-105 duration-200 hover:opacity-40"
                      to={'/search'}
                      style={{ width: `12rem`, height: `3rem` }}>
                      Find some stuff
                    </Link>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* listing results for offer, sale and rent */}

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent stuff that has quality Like New</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more stuff for this category</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent stuff that has a Good Quality</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more stuff for this category</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="bg-yellow-300 dark:bg-yellow-300" style={{
            borderTopLeftRadius: '100px',
            borderTopRightRadius: '100px',
            borderBottomLeftRadius: '0',
            borderBottomRightRadius: '0',
          }}>
      <section className="max-w-[1200px] mx-auto">
        <div className=" grid md:grid-cols-3 py-5">
          <div className=" py-8 px-4 ">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
              Re-Loved
            </h1>
            <p className="">
            We kaboom your beauty stuff
                instantly and memorable.{" "}
            </p>
            <br />
            <div className="flex items-center gap-3">
              <FaLocationArrow />
              <p>Bandung, Indonesia</p>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <FaMobileAlt />
              <p>+62 93430432</p>
            </div>
            {/* Social Handle */}
            <div className="flex items-center gap-3 mt-6">
            <a href="https://www.instagram.com/vinapatriciaa" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-3xl" />
            </a>

            <a href="https://www.discord.com/in/vina#4837" target="_blank" rel="noopener noreferrer">
              <FaDiscord className="text-3xl" />
            </a>

            <a href="https://www.linkedin.com/in/vina-patricia/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-3xl" />
            </a>

            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10 ">
            <div className="">
              <div className="py-8 px-4 ">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                For Guest
                </h1>
                              <ul className={`flex flex-col gap-3`}>
                <li className="cursor-pointer">
                  <a href="/sign-up">New Account</a>
                </li>
                <li className="cursor-pointer">
                  <a href="/search">Start Find a Stuff</a>
                </li>
                <li className="cursor-pointer">
                  <a href="/payments">Use Payments</a>
                </li>
                <li className="cursor-pointer">
                  <a href="/FAQ">FAQ</a>
                </li>
              </ul>

              </div>
            </div>
            <div className="">
              <div className="py-8 px-4 ">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                Explore Us
                </h1>
                                <ul className="flex flex-col gap-3">
                  <li className="cursor-pointer">
                    <a href="/careers">Our Careers</a>
                  </li>
                  <li className="cursor-pointer">
                    <a href="/privacy">Privacy</a>
                  </li>
                  <li className="cursor-pointer">
                    <a href="/terms">Terms & Conditions</a>
                  </li>
                  <li className="cursor-pointer">
                    <a href="/services">Services</a>
                  </li>
                </ul>

              </div>
            </div>
            <div className="">
              <div className="py-8 px-4 ">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                Connect Us
                </h1>
                {/* <ul className="list-disc list-inside"> */}
                <ul className="flex flex-col gap-3">
                  <li className="cursor-pointer">support@ReLoved.id</li>
                  <li className="cursor-pointer">021 - 2208 - 1996</li>
                  <li className="cursor-pointer">Re-Loved, Bandung, Indonesia</li>
                  <li className="cursor-pointer">
                    <a href="/sign-in">Login</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-center py-10 border-t-2 border-black">
          Copyright 2023 • All rights reserved • Re-Loved.
          </div>
        </div>
      </section>
    </div>
    </div>
  );
}
