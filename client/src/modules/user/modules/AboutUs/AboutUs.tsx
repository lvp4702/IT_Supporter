import { Divider } from 'antd';
import { useEffect } from 'react';
import LayoutFullUser from '../../component/layout';

const AboutUs = () => {
  useEffect(() => {
    (async () => {})();
  }, []);

  return (
    <LayoutFullUser>
      <div className="mx-auto w-[1200px] py-8">
        <h3 className="text-blue-600 text-2xl">CÁC MỐC LỊCH SỬ</h3>
        <Divider />

        <p className="text-lg">
          Trường Đại học Công nghiệp Hà Nội có bề dày lịch sử hơn 120 năm xây dựng và phát triển,
          tiền thân là hai trường: Trường Chuyên nghiệp Hà Nội (thành lập năm 1898) và Trường Chuyên
          nghiệp Hải Phòng (thành lập năm 1913). Qua nhiều lần sáp nhập, đổi tên, nâng cấp từ trường
          Trung học Công nghiệp I lên Trường Cao đẳng Công nghiệp Hà Nội và Trường Đại học Công
          nghiệp Hà Nội. Trải qua hơn 120 năm, ở giai đoạn nào, Trường cũng luôn được đánh giá là
          cái nôi đào tạo cán bộ kỹ thuật, cán bộ kinh tế hàng đầu của cả nước, nhiều cựu học sinh
          của Trường đã trở thành lãnh đạo cấp cao của Đảng, Nhà nước đã đi vào lịch sử như: Hoàng
          Quốc Việt, Nguyễn Thanh Bình, Phạm Hồng Thái, Lương Khánh Thiện...; nhiều cựu học sinh,
          sinh viên trở thành các cán bộ nòng cốt, nắm giữ các cương vị trọng trách của Đảng, Nhà
          nước, các Bộ, Ban, Ngành Trung Ương và địa phương.
        </p>

        <div className="">
          <img src="https://www.haui.edu.vn//media/72/t72693.jpg" alt="" className="w-full" />

          <p className="text-center font-bold mt-2 mb-2">
            Sơ lược lịch sử Trường Đại học Công nghiệp Hà Nội
          </p>
        </div>

        <p className="text-lg">
          Các thế hệ cán bộ, giảng viên và học viên, sinh viên nhà trường luôn tự hào và vinh dự
          được Bác Hồ 4 lần về thăm trường. Lời căn dặn của Bác là "kim chỉ nam" để các thế hệ cán
          bộ, giảng viên, học viên, học sinh, sinh viên Nhà trường nỗ lực, phấn đấu, xây dựng Đại
          học Công nghiệp Hà Nội không ngừng phát triển, trở thành một trong những trường đại học kỹ
          thuật hàng đầu của Việt Nam, đào tạo theo định hướng công nghệ ứng dụng.
        </p>

        <div className="">
          <img src="https://www.haui.edu.vn//media/82/t82380.jpg" alt="" className="w-full" />

          <p className="mt-2 mb-2">
            Bác căn dặn “Các cháu cần ra sức học tập để sau này phục vụ đắc lực công cuộc xây dựng
            kinh tế nước nhà. Vì trong việc xây dựng kinh tế hiện đang cần nhiều cán bộ kỹ thuật”.
          </p>

          <img src="https://www.haui.edu.vn//media/72/t72695.jpg" alt="" className="w-full" />
        </div>
      </div>
    </LayoutFullUser>
  );
};

export default AboutUs;
