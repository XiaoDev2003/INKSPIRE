import React from 'react';
import { Text } from '../../../ui/ui';

const AboutTeam = () => {
  const teamMembers = [
    {
      name: 'NGUYỄN DUY QUÂN',
      role: 'Sáng lập & Giám đốc',
      bio: 'Chuyên gia thư pháp với hơn 15 năm kinh nghiệm, tốt nghiệp Đại học Mỹ thuật Hà Nội',
      avatar: '/pages/about/user.png',
      placeholder: 'bg-amber-200'
    },
    {
      name: 'VŨ HOÀI NAM',
      role: 'Trưởng bộ phận Nội dung',
      bio: 'Nhà nghiên cứu văn hóa và lịch sử thư pháp, tác giả của nhiều bài viết chuyên sâu',
      avatar: '/pages/about/user.png',
      placeholder: 'bg-amber-300'
    },
    {
      name: 'NGUYỄN THÀNH VINH',
      role: 'Giảng viên cao cấp',
      bio: 'Nghệ nhân thư pháp trẻ với nhiều giải thưởng quốc gia và quốc tế',
      avatar: '/pages/about/member3.jpg',
      placeholder: 'bg-amber-400'
    },
    {
      name: 'ĐỖ THÀNH TRUNG',
      role: 'Quản lý cộng đồng',
      bio: 'Chuyên gia truyền thông với đam mê kết nối những người yêu thích thư pháp',
      avatar: '/pages/about/member4.jpg',
      placeholder: 'bg-amber-200'
    },
    {
      name: 'BÙI ĐĂNG TUẤN',
      role: 'Quản lý cộng đồng',
      bio: 'Chuyên gia truyền thông với đam mê kết nối những người yêu thích thư pháp',
      avatar: '/pages/about/member4.jpg',
      placeholder: 'bg-amber-200'
    },
  ];

  return (
    <div className="bg-white p-8 rounded-lg shadow-md mt-8">
      <Text
        as="h2"
        size="2xl"
        weight="bold"
        color="text-gray-800"
        className="mb-8"
        isHeading={true}
        line={true}
      >
        Đội ngũ của chúng tôi
      </Text>
      <p className="text-gray-600 mb-8">
        Inkspire được xây dựng bởi những người đam mê thư pháp và nghệ thuật truyền thống.
        Chúng tôi kết hợp kiến thức chuyên môn với tầm nhìn hiện đại để mang đến trải nghiệm tốt nhất cho cộng đồng.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className={`w-1/3 ${member.placeholder} flex items-center justify-center`}>
              {member.avatar ? (
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/pages/about/user.png';
                  }}
                />
              ) : (
                <div className="text-4xl text-amber-600">
                  <i className="fa-solid fa-user-circle"></i>
                </div>
              )}
            </div>
            <div className="w-2/3 p-4">
              <h3 className="font-bold text-gray-800">{member.name}</h3>
              <p className="text-amber-700 text-sm mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600 italic">
          "Thư pháp là nghệ thuật của sự kiên nhẫn và đam mê. Chúng tôi mang những giá trị đó vào mọi việc mình làm."
        </p>
      </div>
    </div>
  );
};

export default AboutTeam;