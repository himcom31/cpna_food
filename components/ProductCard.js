import Image from "next/image";

const styles = `
  .product-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px;
    background-color: white;
    border-radius: 12px;
    border: 2px solid #fed7aa;
    cursor: default;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .product-card:hover {
    border-color: #22c55e;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  .product-img-wrap {
    width: 56px;
    height: 56px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
  }
  .product-name {
    font-size: 12px;
    font-weight: 600;
    color: #374151;
    text-align: center;
    line-height: 1.3;
    margin: 0;
  }
`;

export default function ProductCard({ name, img, color }) {
  return (
    <div className="product-card">
      <style>{styles}</style>
      <div
        className="product-img-wrap"
        style={{
          backgroundColor: color + "20",
          border: `2px solid ${color}40`,
        }}
      >
        <Image
          src={img}
          alt={name}
          fill
          style={{ objectFit: "contain", padding: "6px" }}
        />
      </div>
      <span className="product-name">{name}</span>
    </div>
  );
}