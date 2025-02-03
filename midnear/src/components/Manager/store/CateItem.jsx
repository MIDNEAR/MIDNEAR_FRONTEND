import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';


const CateItem = ({ name, children, isOpen, isBot , onAddCategory}) => {
  const [open, setOpen] = useState(isOpen);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(name);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const toggleOpen = () => {
    if (!isBot && !editMode) setOpen((prev) => !prev);
  };

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    setEditMode(true);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSaveName = () => {
    if (!newName.trim()) {
      alert('이름을 입력해주세요!');
      return;
    }
    setEditMode(false);
    if (onAddCategory) onAddCategory(newName);
  };

  return (
    <div className={`cateItem ${isBot ? 'bot' : ''}`}>
      <div className="inner" onClick={toggleOpen}>
        {!isBot && <div className={`semo ${open ? 'open' : ''}`}></div>}
        <div 
          className="item-name" 
          onDoubleClick={handleDoubleClick}
        >
          {editMode ? (
            <input 
              type="text" 
              value={newName} 
              onChange={handleNameChange}
              onBlur={handleSaveName}
              autoFocus
            />
          ) : (
            newName
          )}
        </div>
      </div>

      {!isBot &&  (
        <motion.div
          className={`children ${open ? 'open' : ''}`}
          initial={false}
          animate={open ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
        >
          {children}

        </motion.div>
      )}
    </div>
  );
};

export default CateItem;
