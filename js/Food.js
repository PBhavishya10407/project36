class Food
{
    constructor()
    {
        this.foodS = 0;
        this.lastFed = null;
       this.image =loadImage("images/Milk.png");
    }
    getfoodStock()
    {
        
        if(this.foodS>0)
        {
            return this.foodS;
        }
    }

    updatefoodStock(foodS)
    {
        this.foodS=foodS;
    }
    
    display()
    {
        var x=80,y=100;

       imageMode(CENTER);
       image(this.image,720,220,70,70);

       if(this.foodS!=0)
       {
          for(var i =0;i<this.foodS;i++)
          {
              if(i%10==0)
              {
                  x=80;
                  y=y+50;
              }
            image(this.image,x,y,50,50);
            x=x+30;
          }
       }
    }
}