import { useEffect, useState } from 'react';
import { postApis } from 'src/apis/admin';
import LayoutFullUser from '../../component/layout';
import Slider from '../../component/slider';
import Event from './events/Event';
import News from './news/News';

const HomePage = () => {
  const [reload, setReload] = useState(true);
  const [posts, setPosts] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [mainContentPostInit, setMainContentPostInit] = useState<any>();

  useEffect(() => {
    if (reload) {
      (async () => {
        const newsRes = await postApis.findAll({ type: '0' });
        const eventRes = await postApis.findAll({ type: '1' });

        setPosts(newsRes.data.data);
        setEvents(eventRes.data.data);

        // const content = JSON.parse(postRes.data?.data[0].content);
      })();

      setReload(false);
    }
  }, [reload]);

  console.log({ posts, events });

  return (
    <LayoutFullUser>
      <div className="my-[20px]">
        <Slider />
      </div>
      <div className="mx-[20%]  bg-[#F3F4F6] px-[24px] py-[20px]">
        <News posts={posts} />
        <Event events={events} />
      </div>
    </LayoutFullUser>
  );
};

export default HomePage;
