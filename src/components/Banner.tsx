import Icon from "react-icons-kit";
import { chevronRight } from "react-icons-kit/fa/chevronRight";

export default function Banner() {
  return (
    <div className="container mt-10">
      <div className="flex justify-center">
        <div className="mx-5 px-5">
          <ul>
            <li className="mb-4 flex justify-between items-center">
              <span>Hand Stamped</span>
              <Icon icon={chevronRight} size={12} className="text-black mx-10" />
            </li>
            <li className="mb-4 flex justify-between items-center">
              <span>Hand Written</span>
              <Icon icon={chevronRight} size={12} className="text-black mx-10" />
            </li>
            <li className="mb-3">Silk</li>
            <li className="mb-3">Javanese</li>
            <li className="mb-3">Abstract</li>
            <li className="mb-3">Uniform Clothes</li>
            <li className="mb-3">Scarf Shawl</li>
            <li className="mb-3">Bag</li>
            <li className="mb-3">Fabric</li>
          </ul>
        </div>

        <div>
          <img src="/seragam-batik-ugm-senior-choir.jpg" alt="" />
        </div>
      </div>
    </div>
  );
}
