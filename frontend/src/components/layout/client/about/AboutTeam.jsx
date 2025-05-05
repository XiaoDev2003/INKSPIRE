import React from 'react';

const AboutTeam = () => {
  const teamMembers = [
    {
      name: 'Nguyễn Văn A',
      role: 'Sáng lập & Giám đốc',
      bio: 'Chuyên gia thư pháp với hơn 15 năm kinh nghiệm, tốt nghiệp Đại học Mỹ thuật Hà Nội',
      avatar: '/images/team/member1.jpg',
      placeholder: 'bg-amber-200'
    },
    {
      name: 'Trần Thị B',
      role: 'Trưởng bộ phận Nội dung',
      bio: 'Nhà nghiên cứu văn hóa và lịch sử thư pháp, tác giả của nhiều bài viết chuyên sâu',
      avatar: '/images/team/member2.jpg',
      placeholder: 'bg-amber-300'
    },
    {
      name: 'Lê Văn C',
      role: 'Giảng viên cao cấp',
      bio: 'Nghệ nhân thư pháp trẻ với nhiều giải thưởng quốc gia và quốc tế',
      avatar: '/images/team/member3.jpg',
      placeholder: 'bg-amber-400'
    },
    {
      name: 'Phạm Thị D',
      role: 'Quản lý cộng đồng',
      bio: 'Chuyên gia truyền thông với đam mê kết nối những người yêu thích thư pháp',
      avatar: '/images/team/member4.jpg',
      placeholder: 'bg-amber-200'
    },
  ];

  return (
    <div className="bg-white p-8 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">Đội ngũ của chúng tôi</h2>
      <p className="text-gray-600 mb-8">
        Inkspire được xây dựng bởi những người đam mê thư pháp và nghệ thuật truyền thống.
        Chúng tôi kết hợp kiến thức chuyên môn với tầm nhìn hiện đại để mang đến trải nghiệm tốt nhất cho cộng đồng.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-1/3 ${member.placeholder} flex items-center justify-center`}>
              {member.avatar ? (
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover"
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