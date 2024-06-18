import Icon from "react-icons-kit";
import { chevronRight } from "react-icons-kit/fa/chevronRight";
import Link from "next/link";

export default function Banner() {
  return (
    <div className="container mt-10">
      <div className="flex justify-center">
        <div className="mx-5 px-5">
          <ul>
            <Link href="/product">
              <li className="mb-4 flex justify-between items-center">
                <span>Hand Stamped</span>
                <Icon
                  icon={chevronRight}
                  size={12}
                  className="text-black mx-10"
                />
              </li>
            </Link>
            <Link href="/product">
              <li className="mb-4 flex justify-between items-center">
                <span>Hand Written</span>
                <Icon
                  icon={chevronRight}
                  size={12}
                  className="text-black mx-10"
                />
              </li>
            </Link>
            <Link href="/product">
              <li className="mb-3">Silk</li>
            </Link>
            <Link href="/product">
              <li className="mb-3">Javanese</li>
            </Link>
            <Link href="/product">
              <li className="mb-3">Abstract</li>
            </Link>
            <Link href="/product">
              <li className="mb-3">Uniform Clothes</li>
            </Link>
            <Link href="/product">
              <li className="mb-3">Scarf Shawl</li>
            </Link>
            <Link href="/product">
              <li className="mb-3">Bag</li>
            </Link>
            <Link href="/product">
              <li className="mb-3">Fabric</li>
            </Link>
          </ul>
        </div>

        <div>
          <img src="/seragam-batik-ugm-senior-choir.jpg" alt="" />
        </div>
      </div>
    </div>
  );
}
