import Link from "next/link";
import Image from "next/image";

const MembershipHero: React.FC = () => {
  return (
    <div>
      <div className="container flex justify-center h-[590px]">
        {/* left container */}

        <div className=" w-[60%]">
          <h1 className="font-heading font-bold text-6xl mt-28">
            Flexible <span className="text-primary">Memberships</span> for{" "}
            <br /> Every Workspace Need.
          </h1>

          <p className="font-sans mt-11 w-96">
            Whether you need a desk for a day or a private office for a year,
            our membership plans are crafted to match your work style and
            budget.
          </p>

          <Link href="/custome-page">
            <button className="mt-11 px-10 py-2 bg-secondary text-white font-semibold text-lg rounded-sm hover:bg-yellow-600 transition">
              Become a member
            </button>
          </Link>
        </div>

        {/* right container */}
        <div className="relative  w-[40%]" >
          <div className="absolute right-0">
            <div className="pix-1 w-64 h-72">
              <Image
                src="/images/hero/pix-1.png"
                alt="hero pix 3"
                // layout="fill"
                width={260}
                height={280}
                objectFit="cover"
              />
            </div>

            <div className="pix-2 w-64 h-72 ">
              <Image
                src="/images/hero/pix-2.png"
                alt="hero pix 3"
                // layout="fill"
                width={260}
                height={280}
                objectFit="cover"
              />
            </div>
          </div>

          <div className="absolute w-72 h-96 right-48 top-20 pix-3 ">
            <Image
              src="/images/hero/pix-3.png"
              alt="hero pix 3"
              layout="fill"
              objectFit="cover"
              className="border-solid border-8 border-background"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipHero;
