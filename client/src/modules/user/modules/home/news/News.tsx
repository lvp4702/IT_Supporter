import { useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { Link } from 'react-router-dom';
import Icon from '../../../../../atoms/icon';

interface props {
  posts: any;
}

const News = ({ posts }: props) => {
  let contentInit;
  useEffect(() => {
    if (typeof posts[0]?.content !== 'undefined') {
      contentInit = JSON.parse(posts[0]?.content);
    }
  }, []);
  const renderContent = () => {
    if (typeof posts[0]?.content !== 'undefined') {
      return JSON.parse(posts[0]?.content);
    }
  };
  return (
    <>
      <div className="flex justify-between items-center border-b-[1px] border-t-0 border-l-0 border-r-0 border-solid border-[#CAD8E6]">
        <div className="uppercase font-[400] text-[25px] leading-[52px] text-[#024da1] border-b-[2px] border-t-0 border-l-0 border-r-0 border-solid border-[#024da1] pr-[20px]">
          Tin Tức
        </div>
        <Link to="/news" className="text-[14px] leading-[16px] text-[#939597]">
          Xem thêm {'>>'}
        </Link>
      </div>
      <div className="rounded-sm overflow-hidden bg-white shadow-sm mt-[20px] ">
        <Link to={`/news/${posts[0]?.id}`} className="block rounded-md overflow-hidden">
          <img
            src={`${process.env.REACT_APP_DOMAIN}/${posts[0]?.image}`}
            className="w-full h-96 object-cover transform hover:scale-110 transition duration-500"
          />
        </Link>
        <div className="p-4 pb-5">
          <Link to={`/news/${posts[0]?.id}`}>
            <h2 className="block text-2xl font-semibold text-gray-700 hover:text-blue-500 transition font-roboto">
              {posts[0]?.title}
            </h2>
          </Link>

          {/* <p className="text-gray-500 text-sm mt-2">
            {renderContent() ? (
              <div className="truncate">
                <Editor
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  initialContentState={renderContent()}
                  readOnly
                  toolbarHidden
                />
              </div>
            ) : (
              <div>{posts[0]?.content}</div>
            )}
          </p> */}
          <div className="mt-3 flex space-x-4">
            <div className="flex text-gray-400 text-sm items-center">
              <span className="mr-2 text-xs">
                <Icon name="user-pending" width={14} />
              </span>
              {posts[0]?.author?.username}
            </div>
            <div className="flex text-gray-400 text-sm items-center">
              <span className="mr-2 text-xs">
                <Icon name="time" width={14} />
              </span>
              {new Date(posts[0]?.created_at)?.toLocaleDateString('en-US')}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {posts.map((item: any, index: number) => {
            if (index > 0 && index < 5)
              return (
                <div className="rounded-sm bg-white p-4 pb-5 shadow-sm">
                  <img
                    src={`${process.env.REACT_APP_DOMAIN}/${item?.image}`}
                    className="w-full h-60 object-cover transform hover:scale-110 transition duration-500 rounded-[4px]"
                  />
                  <div className="mt-3">
                    <Link to={`/news/${item.id}`}>
                      <h2 className="block text-xl font-semibold text-gray-700 hover:text-blue-500 transition font-roboto">
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
              );
          })}
        </div>
      </div>
    </>
  );
};

export default News;
