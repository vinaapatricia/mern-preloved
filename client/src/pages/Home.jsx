/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
  {/* top */}
  
  <div className='flex flex-col gap-10 p-28 px-3 max-w-6xl mx-auto place-items-center'>
  {/* <img
    className="rounded-lg mb-6"
    src="../images/Secondhand.png"
    alt="Image description"
  /> */}
  <img
    className="rounded-lg mb-6"
    src="../images/Secondhand-2.png"
    alt="Image description"
  />
    
    <div className='text-gray-400 text-xs sm:text-sm place-items-center text-center'>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio laborum in sunt. Praesentium, architecto. Unde dolores beatae quam corporis dolorem quis rem ab, optio nostrum, illo consequuntur fugiat, assumenda recusandae? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis error quam, ipsa voluptatem suscipit reiciendis laborum sed quo. Hic at inventore officiis consectetur libero harum incidunt dolorem in nam illum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae laborum iusto mollitia perferendis repudiandae nisi impedit natus reiciendis ducimus rem necessitatibus facilis nesciunt, dolorum, velit doloremque. Magni illo voluptate delectus.
    </div>
    <Link
     className="bg-yellow-300 text-white p-3 rounded-lg text-center hover:opacity-50 hover:text-black"
      to={'/search'}
      style={{ width: `12rem`, height: `3rem` }}
    >
      Get Started
    </Link>
  </div>
</div>

  );
}
