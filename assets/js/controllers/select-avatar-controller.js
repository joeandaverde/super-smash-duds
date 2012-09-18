var SelectAvatarController = (function () {
   
   Extends(SelectAvatarController, Game.Controller);
   
   function SelectAvatarController (gameBoard, avatars, onSelection) {
      SelectAvatarController._super.constructor.call(this, gameBoard);
      this.onSelection = onSelection;
      var controller = this;
      
      this.xoffset = (this.world.width - (avatars.length * 120)) / 2;

      avatars.forEach(function (a, i) {
         controller.entities.push(new Game.Sprite({ 
            image: a,
            x: controller.xoffset + i * 120, 
            y: 100, 
            width: 100,
            height: 150
         }));
      });
      
      this.selector = new Game.Rectangle({ width: 100, height: 20, x: 0, y: 250, color: 'blue' });

      this.entities.push(this.selector);
      this.entities.push(new Game.Label({ x: 200, y: 50, text: 'Select an avatar!', color: 'black', font: 'bold 50px sans-serif' }));
      this.avatars = avatars;
      this.selection = 0;
   }

   SelectAvatarController.prototype.update = function (time) {

      if (this.selectionMade) {
         return;
      }

      SelectAvatarController._super.update.call(this, time);

      if (Game.Keyboard.isPressed('enter') || Game.Keyboard.isPressed('space')) {
         this.onSelection( { avatar: this.avatars[this.selection], name: this.name || 'n00b' });
         this.selectionMade = true;
         return;
      }

      if (Game.Keyboard.isPressed('right')) {
         this.selection += 1
      } else if (Game.Keyboard.isPressed('left')) {
         this.selection -= 1;
      }

      if (this.selection < 0) {
         this.selection = this.avatars.length - 1;
      } else if(this.selection == this.avatars.length) {
         this.selection = 0;
      }

      this.selector.x = this.xoffset + (this.selection ) * 120;
   };

   return SelectAvatarController;

})();