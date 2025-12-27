import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
  const [cartItems, setCartItems] = useState([]);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const navigate = useNavigate();

  // Load cart items from localStorage
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cartData);
  }, [showCartDropdown]); // Reload when dropdown is toggled

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.productId !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCartClick = () => {
    navigate('/user/cart');
    setShowCartDropdown(false);
  };

  return (
    <div className="bg-blue-600 px-3 py-2 shadow-md relative">
      <div className="flex items-center justify-between">
        
        <div>
          <h1 className="text-white text-[28px] font-bold">Flipkart</h1>
        </div>

    
        
        <div className="flex items-center">
          <Link to="/login">
            <button className="bg-white text-blue-600 font-semibold rounded-sm px-4 py-1 mr-3 hover:bg-gray-200">
              Logout
            </button>
          </Link>
          
          {/* Cart button with dropdown */}
          <div className="relative">
            <button 
              className="bg-yellow-400 text-black font-semibold rounded-sm px-4 py-1 hover:bg-yellow-300 flex items-center"
              onClick={() => setShowCartDropdown(!showCartDropdown)}
            >
              🛒 Cart {cartItemCount > 0 && `(${cartItemCount})`}
            </button>
            
            {/* Cart Dropdown */}
            {showCartDropdown && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 border border-gray-200">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Your Cart</h3>
                    <button 
                      onClick={() => setShowCartDropdown(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                  {cartItems.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                      Your cart is empty
                    </div>
                  ) : (
                    <>
                      {cartItems.map((item) => (
                        <div key={item.productId} className="flex items-center p-4 border-b hover:bg-gray-50">
                          <img 
                            src={item.imageUrl || "https://via.placeholder.com/60"} 
                            alt={item.pname}
                            className="w-16 h-16 object-cover rounded mr-3"
                            onError={(e) => e.target.src = "https://via.placeholder.com/60"}
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{item.pname}</h4>
                            <p className="text-pink-600 font-bold">₹{item.price} × {item.quantity}</p>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.productId)}
                            className="text-red-600 hover:text-red-800 ml-2"
                          >
                            🗑️
                          </button>
                        </div>
                      ))}
                    </>
                  )}
                </div>
                
                {cartItems.length > 0 && (
                  <div className="p-4 border-t">
                    <div className="flex justify-between font-bold mb-3">
                      <span>Total:</span>
                      <span>₹{calculateTotal()}</span>
                    </div>
                    <button 
                      onClick={handleCartClick}
                      className="w-full bg-orange-500 text-white font-semibold py-2 rounded hover:bg-orange-600"
                    >
                      View Cart & Checkout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}