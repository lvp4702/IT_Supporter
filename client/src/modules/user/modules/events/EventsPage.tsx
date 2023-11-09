import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { categoryApis, postApis } from 'src/apis/admin';
import Icon from 'src/atoms/icon';
import LayoutFullUser from '../../component/layout';

const EventsPage = () => {
  const [reload, setReload] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (reload) {
      (async () => {
        const postRes = await postApis.findAll({ type: 1 });
        setPosts(postRes.data?.data || []);
      })();

      setReload(false);
    }
  }, [reload]);

  useEffect(() => {
    if (reload) {
      (async () => {
        const postRes = await categoryApis.findAll();
        setCategories(postRes.data?.data || []);
      })();
    }
  }, [reload]);
  return (
    <LayoutFullUser>
      <div className="flex">
        <div className="w-[calc(20%-100px)] top-[10px] ml-[50px] mr-[20px] my-[20px] bg-white shadow-sm rounded-sm p-4 ">
          <h3 className="text-xl font-semibold text-gray-700 mb-3 font-roboto">Thể loại</h3>
          <div className="space-y-2">
            {categories.map((item: any) => (
              <a
                href="#"
                className="flex leading-4 items-center text-gray-700 font-semibold text-sm uppercase transition hover:text-blue-500"
              >
                <span className="mr-2">
                  <i className="far fa-folder-open"></i>
                </span>
                <span>{item.name}</span>
                <p className="ml-auto font-normal">{item.posts.length}</p>
              </a>
            ))}
          </div>
        </div>
        <div className="my-[20px] flex-1 bg-white mr-[20vw]">
          <div className=" mx-[20px]">
            {posts.map((item, index) => (
              <div className="pt-[20px] bg-white flex justify-between items-center" key={item.id}>
                <Link
                  to={`/events/${item.id}`}
                  className=" w-full group p-[10px] hover:bg-[#E5F9FF] border-t-0 border-l-0 border-r-0 border-solid border-[#CAD8E6] border-b-[1px] flex justify-between items-center"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-shrink-0">
                      <img
                        src={`${process.env.REACT_APP_DOMAIN}/${item?.image}`}
                        className="h-[80px] w-[80px] rounded object-cover"
                      />
                    </div>
                    <div className="flex-grow pl-3">
                      <h5 className="text-[18px] pt-[10px] leading-5 block font-roboto font-semibold transition group-hover:text-[#2EA2C7]">
                        {item?.title}
                      </h5>
                      <div className="mt-2 flex space-x-3">
                        <div className="flex text-gray-400 text-sm items-center">
                          <span className="mr-2 text-xs">
                            <Icon name="user-pending" width={14} />
                          </span>
                          {item.author?.username}
                        </div>
                        <div className="flex text-gray-400 text-sm items-center">
                          <span className="mr-2 text-xs">
                            <Icon name="time" width={14} />
                          </span>
                          {new Date(item?.created_at)?.toLocaleDateString('en-US')}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-[#333333] font-[700] text-[16px] leading-[18px]">
                    Thể loại: <span className="text-[#00aded] ml-[10px]">{item.category.name}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutFullUser>
  );
};

export default EventsPage;
