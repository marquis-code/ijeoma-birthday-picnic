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
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            borderBottom: "1px solid rgba(232,214,240,0.28)",
            paddingBottom: "18px",
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "#cba3de",
              }}
            >
              Ijeoma’s Birthday Picnic
            </p>
            <h1
              style={{
                margin: "8px 0 0",
                fontFamily: "'Clash Display', Arial, sans-serif",
                fontSize: "55px",
                fontWeight: 600,
                lineHeight: 0.92,
                letterSpacing: "-0.045em",
                color: "#f8f3fa",
              }}
            >
              The Wish List
            </h1>
          </div>
          <div style={{ textAlign: "right" }}>
            <p
              style={{
                margin: 0,
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#f8f3fa",
              }}
            >
              05 · 12 · 2026
            </p>
            <p
              style={{
                margin: "5px 0 0",
                fontSize: "10px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(248,243,250,0.62)",
              }}
            >
              Jaekel House · Lagos
            </p>
          </div>
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
          A little list of lovely things, for the friends who insist on spoiling
          her. No pressure, no fuss — your presence is the present.
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

        <span
          style={{
            position: "absolute",
            right: "50px",
            bottom: "158px",
            fontFamily: "'Clash Display', Arial, sans-serif",
            fontSize: "150px",
            fontWeight: 600,
            lineHeight: 1,
            color: "rgba(203,163,222,0.045)",
          }}
        >
          05
        </span>
        <div
          style={{
            position: "absolute",
            left: "58px",
            right: "58px",
            bottom: "158px",
            textAlign: "center",
          }}
        >
          <span
            style={{
              display: "block",
              width: "42px",
              height: "1px",
              margin: "0 auto 16px",
              backgroundColor: "rgba(232,214,240,0.4)",
            }}
          />
          <p
            style={{
              margin: 0,
              fontFamily: "'Clash Display', Arial, sans-serif",
              fontSize: "23px",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "#e8d6f0",
            }}
          >
            The best gift?{" "}
            <span style={{ color: "#cba3de" }}>You, there.</span>
          </p>
          <p
            style={{
              margin: "9px 0 0",
              fontSize: "9px",
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(248,243,250,0.5)",
            }}
          >
            With love, from all of us
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            left: "58px",
            right: "58px",
            bottom: "48px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "20px",
            borderTop: "1px solid rgba(232,214,240,0.28)",
            paddingTop: "16px",
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                fontFamily: "'Clash Display', Arial, sans-serif",
                fontSize: "16px",
                fontWeight: 500,
                color: "#e8d6f0",
              }}
            >
              See you at the picnic.
            </p>
            <p
              style={{
                margin: "4px 0 0",
                fontSize: "9.5px",
                letterSpacing: "0.13em",
                textTransform: "uppercase",
                color: "rgba(248,243,250,0.5)",
              }}
            >
              Jaekel House · Nigerian Railway Corporation Compound, Ebute Metta
            </p>
          </div>
          <span
            style={{
              fontFamily: "'Clash Display', Arial, sans-serif",
              fontSize: "34px",
              fontWeight: 500,
              color: "#cba3de",
              lineHeight: 1,
            }}
          >
            I
          </span>
        </div>
      </div>
    </div>
  );
});

export default WishlistPdf;
