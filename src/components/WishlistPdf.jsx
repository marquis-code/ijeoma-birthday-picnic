import { forwardRef } from "react";
import { wishes } from "../data/wishes";

const WishlistPdf = forwardRef(function WishlistPdf(_, ref) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        left: "-10000px",
        top: 0,
        width: "794px",
        height: "1123px",
        backgroundColor: "#3e1b4b",
        color: "#f8f3fa",
        fontFamily: "Satoshi, Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "22px",
          border: "1px solid rgba(232,214,240,0.32)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "32px",
          border: "1px solid rgba(232,214,240,0.14)",
        }}
      />
      <div style={{ position: "relative", height: "100%", padding: "56px 58px 44px" }}>
        <div
          style={{
            borderBottom: "1px solid rgba(232,214,240,0.28)",
            paddingBottom: "18px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontFamily: "'Clash Display', Arial, sans-serif",
              fontSize: "50px",
              fontWeight: 600,
              lineHeight: 0.95,
              letterSpacing: "-0.045em",
              color: "#f8f3fa",
            }}
          >
            Ijeoma’s Birthday Wishlist
          </h1>
        </div>

        <p
          style={{
            margin: "22px 0 0",
            maxWidth: "560px",
            fontSize: "13px",
            lineHeight: 1.6,
            color: "rgba(248,243,250,0.72)",
          }}
        >
          For the friends insisting on spoiling her — no pressure, no fuss.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "34px",
            marginTop: "22px",
            borderTop: "1px solid rgba(232,214,240,0.22)",
          }}
        >
          {[wishes.slice(0, 8), wishes.slice(8)].map((column, columnIndex) => (
            <div key={columnIndex} style={{ flex: 1, minWidth: 0 }}>
              {column.map((wish) => {
                const index = wishes.findIndex((item) => item.id === wish.id);
                return (
                  <div
                    key={wish.id}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      padding: "13px 0",
                      borderBottom: "1px solid rgba(232,214,240,0.16)",
                    }}
                  >
                    <span
                      style={{
                        width: "26px",
                        flex: "none",
                        fontFamily: "'Clash Display', Arial, sans-serif",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#cba3de",
                        paddingTop: "2px",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div style={{ minWidth: 0 }}>
                      <p
                        style={{
                          margin: 0,
                          fontFamily: "'Clash Display', Arial, sans-serif",
                          fontSize: "17px",
                          fontWeight: 500,
                          lineHeight: 1.15,
                          letterSpacing: "-0.01em",
                          color: "#f8f3fa",
                        }}
                      >
                        {wish.title}
                      </p>
                      <p
                        style={{
                          margin: "4px 0 0",
                          fontSize: "11.5px",
                          lineHeight: 1.4,
                          color: "rgba(248,243,250,0.6)",
                        }}
                      >
                        {wish.note}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "18px",
            padding: "13px 16px",
            border: "1px solid rgba(232,214,240,0.24)",
            backgroundColor: "rgba(253,249,254,0.035)",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "9px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#cba3de",
            }}
          >
            Money gifts
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px 34px",
              marginTop: "8px",
              fontFamily: "'Clash Display', Arial, sans-serif",
              fontSize: "13px",
              fontWeight: 500,
              color: "#f8f3fa",
            }}
          >
            <span>GTBank · 0684531680</span>
            <span>Opay · 7035628526</span>
            <span style={{ color: "#cba3de" }}>Ojukwu Ijeoma Linda</span>
          </div>
          <p
            style={{
              margin: "7px 0 0",
              fontSize: "9px",
              lineHeight: 1.45,
              color: "rgba(248,243,250,0.58)",
            }}
          >
            Send your transfer proof to +234 703 562 8526 on WhatsApp and we’ll
            appreciate you extra specially. 💜
          </p>
        </div>

        <svg
          viewBox="0 0 64 64"
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            bottom: "46px",
            width: "76px",
            height: "76px",
            transform: "translateX(-50%)",
            opacity: 0.22,
          }}
        >
          <path
            d="M32 52S10 39.8 10 24.5C10 17.7 15.2 13 21.5 13c4.2 0 8 2.2 10.5 5.7C34.5 15.2 38.3 13 42.5 13 48.8 13 54 17.7 54 24.5C54 39.8 32 52 32 52Z"
            fill="#cba3de"
          />
        </svg>
      </div>
    </div>
  );
});

export default WishlistPdf;
