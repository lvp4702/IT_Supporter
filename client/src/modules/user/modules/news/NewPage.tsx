import LayoutFullUser from '../../component/layout';
import image1 from '../../../../atoms/images/312221646_771694890930297_6215795452150606467_n.png';
import image2 from '../../../../atoms/images/309911559_766777848088668_7456215299439506121_n.png';
import image3 from '../../../../atoms/images/292355658_1935330136857061_8603834351602225961_n.png';
import { useEffect, useState } from 'react';
import { postApis } from 'src/apis/admin';
import Icon from 'src/atoms/icon';
import { Link } from 'react-router-dom';
// import process from 'process';
import { categoryApis } from 'src/apis/admin';
import { Editor } from 'react-draft-wysiwyg';
import { Select } from 'antd';

const NewPage = () => {
  const [reload, setReload] = useState(true);
  const [select, setSelect] = useState<any>();
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState([]);

  const handleChange = (value: string) => {
    // console.log(`selected ${value}`);
    setSelect(value);
  };

  useEffect(() => {
    if (reload) {
      (async () => {
        const postRes = await postApis.findAll({ type: 0 });
        setPosts(postRes.data?.data || []);
      })();

      setReload(false);
    }
  }, [reload]);

  const resultSearch = () => {
    if (!select || select === -1) return posts;

    return posts.filter((it) => it.author.role === select);
  };

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
        <div className="w-[calc(20%-100px)] sticky top-[10px] ml-[50px] mr-[20px] my-[20px] bg-white shadow-sm rounded-sm p-4 h-[500px]">
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
        <div className="my-[20px] flex-1">
          <div className="py-[20px]">
            <Select
              defaultValue="Tất cả"
              style={{ width: 240 }}
              onChange={handleChange}
              options={[
                {
                  value: -1,
                  label: 'Tất cả',
                },
                {
                  value: 'r1',
                  label: 'Admin',
                },
                {
                  value: 'r2',
                  label: 'Cán bộ',
                },
                {
                  value: 'r3',
                  label: 'Cộng tác viên',
                },
                {
                  value: 'r4',
                  label: 'Thành viên',
                },
              ]}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {resultSearch().map((item) => (
              <div className="rounded-sm bg-white p-4 pb-5 shadow-sm">
                <Link to={`/news/${item.id}`} className="block rounded-md overflow-hidden">
                  <img
                    src={`${process.env.REACT_APP_DOMAIN}/${item?.image}`}
                    className="w-full h-[30vh] object-cover transform hover:scale-110 transition duration-500"
                  />
                </Link>
                <div className="mt-3">
                  <Link to={`/news/${item.id}`}>
                    <h2 className="block text-xl font-semibold text-gray-700 hover:text-blue-500 transition font-roboto ">
                      {item?.title}
                    </h2>
                  </Link>
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
            ))}
          </div>
        </div>
        <div className=" w-[calc(20%-100px)] sticky top-[10px] mr-[50px] ml-[20px] my-[20px] shadow-sm rounded-sm p-4 h-[550px]">
          <img src={image1} alt="" className="w-full object-cover" />
          <img src={image2} alt="" className="w-full object-cover mt-[12px]" />
          <img src={image3} alt="" className="w-full object-cover mt-[12px]" />
        </div>
      </div>
    </LayoutFullUser>
  );
};

export default NewPage;
