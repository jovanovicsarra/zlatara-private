const PRODUCTS = {
  1: { name: "Ogrlica Aurelia", price: 32900 },
  2: { name: "Prsten Siena", price: 28900 },
  3: { name: "Minđuše Luna", price: 24900 },
  4: { name: "Narukvica Venezia", price: 36900 },
  5: { name: "Set Celeste", price: 64900 },
  6: { name: "Ogrlica Noir", price: 41900 },
  7: { name: "Prsten Heritage", price: 38900 },
  8: { name: "Minđuše Riviera", price: 31900 }
};

function clean(value, max = 160) {
  return String(value || "").trim().slice(0, max);
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body || {};
    const cart = Array.isArray(body.cart) ? body.cart : [];
    const customer = body.customer || {};

    if (!cart.length || cart.length > 30) {
      return res.status(400).json({ error: "Korpa nije validna." });
    }

    if (!body.termsAccepted || body.termsVersion !== "2026-09-26") {
      return res.status(400).json({ error: "Uslovi kupovine moraju biti prihvaćeni." });
    }

    const required = [customer.name, customer.phone, customer.email, customer.address, customer.city];
    if (required.some(v => !clean(v))) {
      return res.status(400).json({ error: "Nedostaju obavezni podaci za porudžbinu." });
    }

    const normalized = cart.map(item => {
      const id = Number(item.id);
      const qty = Math.max(1, Math.min(10, Number(item.qty) || 1));
      const product = PRODUCTS[id];
      if (!product) throw new Error("Nepoznat proizvod u korpi.");
      return { id, qty, name: product.name, unitPrice: product.price };
    });

    const total = normalized.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
    if (!Number.isFinite(total) || total <= 0) {
      return res.status(400).json({ error: "Iznos porudžbine nije validan." });
    }

    const orderId = `ZS-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

    // VAŽNO: cena se uvek ponovo računa na serveru iz PRODUCTS kataloga.
    // Broj kartice, datum isteka i CVC se NIKADA ne šalju ovom endpointu.
    // Kada banka/procesor dostavi tehničku dokumentaciju i merchant kredencijale,
    // ovde se kreira payment session na njihovom serveru i vraća redirectUrl.
    // Tajni ključevi se čuvaju isključivo u Vercel Environment Variables.

    if (process.env.PAYMENT_LIVE !== "true") {
      return res.status(503).json({
        code: "PAYMENT_SETUP_REQUIRED",
        orderId,
        total,
        message: "Kartično plaćanje još nije aktivirano kod platnog procesora. Porudžbina nije naplaćena."
      });
    }

    return res.status(501).json({
      code: "GATEWAY_ADAPTER_REQUIRED",
      orderId,
      total,
      message: "Platni procesor je označen kao aktivan, ali bankarski adapter još nije dodat. Porudžbina nije naplaćena."
    });
  } catch (error) {
    return res.status(400).json({ error: error.message || "Neispravna porudžbina." });
  }
}
